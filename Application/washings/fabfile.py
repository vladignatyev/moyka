# -*- coding: utf-8 -*-

__author__ = 'ya.na.pochte@gmail.com'

from fabric.api import task, run, local, cd, lcd, env, put, execute, settings, get

env.passwords = {
    "root@188.127.231.82": "41kSItybaU9U",
}

env.hosts = ['root@188.127.231.82']

remotepath = "/home/moykainfo/"

@task()
def test():
    pass

@task()
def package():
    print "Packaging..."
    local("python setup.py sdist", True)

@task()
def deploy():
    execute(package)
   
    app = "dist/moykainfo-0.91.tar.gz"

    with cd(remotepath):
        put("requirements.txt", "requirements.txt")
        run("./env/bin/pip install --upgrade -r requirements.txt")

        with settings(warn_only=True):
            run("./env/bin/pip uninstall moykainfo -y")

        put(app, "/tmp/app.moykainfo.tgz")

        run("./env/bin/pip install /tmp/app.moykainfo.tgz")

        put("settings.py", "settings.py")

        run("rm -rf www/static/*")

        put("manage.py", "manage.py")

        run("chmod 777 manage.py")

        run("mkdir -p /home/moykainfo/static")
        run("mkdir -p /home/moykainfo/templates")
        put("templates", "/home/moykainfo")

        if raw_input('Do you need to reload all data? (YES/no)') == 'YES':
            run("./env/bin/python manage.py syncdb --noinput")
            # run("./env/bin/python manage.py flush --noinput")

        run("./env/bin/python manage.py collectstatic --noinput")
        put("wsgi.py", "wsgi.py")
        run("touch uwsgi.yml")

    local("say uploaded!")


@task
def get_logs():
    with cd(remotepath):
        run("tail -n 100 logs/application.log")
        get("logs/application.log", "logs/application.log")