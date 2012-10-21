#!coding:utf-8
from datetime import datetime as dt
from datetime import timedelta
import datetime

def _normalize10(value):
    if value > 9:
        return str(value)
    else:
        return '0' + str(value)


def format_dt(dt_obj):
    return _normalize10(dt_obj.hour) + ':' + _normalize10(dt_obj.minute)

class TimeGrid(object):
    def __init__(self, dt_start, dt_end, step_min, tomorrow=False):
        def time_from_dt(dt_obj):
            return datetime.time(hour=dt_obj.hour, minute=dt_obj.minute)

        self.grid = []
        d = timedelta(minutes=step_min)
        now = dt.now()
        if tomorrow:
            now = now + timedelta(days=1)
        initial = dt.combine(now, dt_start)
        d2 = initial
        trigger = False
        for i in range(0,24 * 60 / step_min):
            if not trigger:
                if (time_from_dt(d2) < dt_end):
                    trigger = True
            else:
                if (time_from_dt(d2) > dt_end):
                    return
            
            self.grid.append(d2)
            d2 = d2 + d

    def strings(self):
        for tick in self.grid:
            yield format_dt(tick)

    def stringified(self):
        result = []
        for s in self.strings():
            result.append(s)
        return result

    def match(self, t_obj):
        for tick in self.grid:
            if t_obj.hour == tick.hour \
            and t_obj.minute == tick.minute\
            and t_obj.second == tick.second:
                return True
        return False

    def __str__(self):
        return str(self.stringified())

def assert_equal(case, list1, list2):
    if len(list1) != len(list2):
        raise ValueError(case)

    for i in range(0, len(list1)-1):
        if list1[i] != list2[i]:
            print list1[i]
            print list2[i]
            raise ValueError(case)

    return True


# if __name__ == '__main__':
#     t1 = datetime.time(hour=5, minute=0)
#     t2 = datetime.time(hour=3, minute=3)
#     tg1 = TimeGrid(t1, t2, 12)

#     t_test = datetime.time(hour=3, minute=0)
#     m = tg1.match(t_test)
#     print m
#     # print tg1
#     import sys
#     sys.exit(0)

#     assert_equal('first', tg1, ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'])

#     t1 = datetime.time(hour=9, minute=0)
#     t2 = datetime.time(hour=7, minute=30)
#     tg1 = gen_timegrid(t1, t2, 30)

#     assert_equal(tg1, ['09:00', '09:30', '10:00', 
#         '10:30', '11:00', '11:30', '12:00', '12:30',
#         '13:00', '13:30', '14:00', '14:30', '15:00',
#         '15:30', '16:00', '16:30', '17:00', '17:30',
#         '18:00', '18:30', '19:00', '19:30', '20:00',
#         '20:30', '21:00', '21:30', '22:00', '22:30',
#         '23:00', '23:30', '00:00', '00:30', '01:00',
#         '01:30', '02:00', '02:30', '03:00', '03:30',
#         '04:00', '04:30', '05:00', '05:30', '06:00',
#         '06:30', '07:00', '07:30'])
