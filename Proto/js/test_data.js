
var test_data = {
    "features": [{
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1051167228",
                "internal": {
                    "group_size": "1",
                    "owner": "157526405",
                    "email": "Tehosmotrstas@yandex.ru",
                    "geoid": "11131",
                    "company_id": "1009228028",
                    "docid": "2238139",
                    "featureData": "H4sIAAAAAAAAAN2Z0W6DMAxF3\/cvFXHi2I6E+JdqY1KlbqvaddL+fjAoA162BBHcPQFp1RyunWsnLZ\/r\/fv1XO8+9sdrfakeyslAVXYXUxb98+V6Oh0P9Xl3eKogeIQgHKQsxuPl49vLaf\/62d4zobWWnIeyGA0P0zT3zWcIDISuLEbDPw\/91NuRhRBF9ieS7rsw4MeREUkQCiikjazXjI2oJCNg0knGFLxXuwLiNMtG1mhmVZJRoxmrJGMP1ugka1xDndPeXMMorU4elDptG02lK6Ahi3ONDJqhsxjAWERtZIPTglqyuC6ou3QL29o2FVYvBmzjxJsgQsugHTEoRIxIwdt7IC2sE4tU9O5\/qMi8pYpMClWcIWoM9BSRQCFiSi7Klrno9FcXeweIqBAxIRfF5s3FBES\/dKOUYUVnVnHWL2rMxVkzptG6Z76osV+cIoLGNiJhuUDmZiwFcbsazWLYZzmoTDlAGhDX3wEuRZT1TSceMTYX2\/dwS08j1kdEtYgiYowL5FJXtAhzQE8+7ow6EtFSMCE10ImIs9lX7bozqYhkR4VcLWJqAVwe6ObX7aq+uBwRkNZtxvIEuvVF9FsF+tvy+N5V5MAE6DL7Ygpi6iY1D6IIeZ9aoxfmYi\/Q3VeXbgbcxLp3q57Oomuqv1iEX\/61mj5fqocvRRZoK60lAAA=",
                    "Snippet": {
                        "FeatureSet": ["official_checkup"]
                    }
                },
                "name": "Стас",
                "names": ["Стас"],
                "address": "Самарская обл., Тольятти, ул. Воскресенская, 34",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти, ул. Воскресенская, 34",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Воскресенская улица",
                                        "Premise": {
                                            "PremiseNumber": "34"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "url": "http:\/\/tehosmotr-stas.okis.ru",
                "urls": ["http:\/\/tehosmotr-stas.okis.ru"],
                "Categories": [{
                    "name": "Автосервисы, автотехцентры",
                    "internal": {
                        "id": "184105246"
                    }
                }, {
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "Пункты техосмотра",
                    "internal": {
                        "id": "6615355764"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 37-13-71",
                    "country": "7",
                    "prefix": "8482",
                    "number": "371371"
                }],
                "Hours": {
                    "Availability": {
                        "Everyday": "",
                        "Interval": ""
                    },
                    "text": "08:00-20:00"
                },
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                },
                "Features": [{
                    "type": "bool",
                    "id": "tire_fitting",
                    "name": "шиномонтаж",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "cafe",
                    "name": "кафе",
                    "value": false
                }, {
                    "type": "bool",
                    "id": "car_waxing",
                    "name": "нанесение защитного воска",
                    "value": true
                }, {
                    "type": "enum",
                    "id": "car_wash_type",
                    "name": "мойка",
                    "value": ["бесконтактная", "комплексная", "двигателя", "колес", "грузовиков"],
                    "values": ["бесконтактная", "комплексная", "двигателя", "колес", "грузовиков"]
                }, {
                    "type": "bool",
                    "id": "car_wash",
                    "name": "мойка",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "car_valeting",
                    "name": "химчистка салона",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "atm",
                    "name": "банкомат",
                    "value": false
                }, {
                    "type": "bool",
                    "id": "glass_tinting",
                    "name": "тонировка",
                    "value": false
                }, {
                    "type": "bool",
                    "id": "maintenance",
                    "name": "ТО",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "car_servicing",
                    "name": "автосервис",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "techosmotr",
                    "name": "техосмотр",
                    "value": true
                }, {
                    "type": "text",
                    "id": "washing_zones",
                    "name": "количество моечных зон",
                    "value": "-3"
                }, {
                    "type": "bool",
                    "id": "official_checkup",
                    "name": "гостехосмотр",
                    "value": true
                }, {
                    "type": "enum",
                    "id": "car_repairs",
                    "name": "виды работ",
                    "value": ["Покраска автомобиля", "предрейсовый техосмотр", "чистка форсунок", "Промывка инжектора", "Установка парктроника", "Замена масла", "Полировка", "Компьютерная диагностика автомобиля", "развал-схождение", "ремонт КПП", "ремонт двигателя", "ремонт пластиковых бамперов", "ремонт АКПП", "кузовной ремонт"],
                    "values": ["Покраска автомобиля", "предрейсовый техосмотр", "чистка форсунок", "Промывка инжектора", "Установка парктроника", "Замена масла", "Полировка", "Компьютерная диагностика автомобиля", "развал-схождение", "ремонт КПП", "ремонт двигателя", "ремонт пластиковых бамперов", "ремонт АКПП", "кузовной ремонт"]
                }, {
                    "type": "bool",
                    "id": "wi_fi",
                    "name": "wi-fi",
                    "value": false
                }, {
                    "type": "bool",
                    "id": "car_film_coating",
                    "name": "обклейка пленкой",
                    "value": false
                }, {
                    "type": "enum",
                    "id": "car_brand",
                    "name": "марка",
                    "value": ["ВАЗ", "Toyota", "Volkswagen", "Ford", "Hyundai", "Nissan", "Mitsubishi", "Mercedes-Benz", "Kia", "Opel", "Chevrolet", "Audi", "BMW", "Renault", "Honda", "Mazda", "ГАЗ", "Skoda", "Daewoo", "все", "отечественные", "импортные"],
                    "values": ["ВАЗ", "Toyota", "Volkswagen", "Ford", "Hyundai", "Nissan", "Mitsubishi", "Mercedes-Benz", "Kia", "Opel", "Chevrolet", "Audi", "BMW", "Renault", "Honda", "Mazda", "ГАЗ", "Skoda", "Daewoo", "все", "отечественные", "импортные"]
                }, {
                    "type": "bool",
                    "id": "tire_blacking",
                    "name": "чернение резины",
                    "value": true
                }],
                "Snippet": {
                    "FeatureSet": ["car_brand", "car_repairs", "car_wash", "tire_fitting", "maintenance", "techosmotr"]
                }
            },
            "description": "Самарская обл., Тольятти, ул. Воскресенская, 34",
            "name": "Стас",
            "boundedBy": [
                [49.272965999999997, 53.535324699999997],
                [49.282966000000002, 53.545324700000002]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.277965999999999, 53.540325000000003]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1091863929",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1091863929",
                    "docid": "1039849",
                    "featureData": "H4sIAAAAAAAAALNJS00sKS1K1S1LzClNLbbjskERsLOBUAY2+lB+cWlBQU5mapFuZoqdkYGRiZG5paGFiY0+srhNcn5uQWJeJUyNgamRsZGpjT6SMNwaINvY1NDE0NzQzMTYRh9JGMGBWq2P7lYA0rxr670AAAA="
                },
                "name": "Автомойка",
                "names": ["Автомойка"],
                "address": "Самарская обл., Тольятти г., ш. Южное, 28, строение №2",
                "postalCode": "445043",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ш. Южное, 28, строение №2",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Южное шоссе",
                                        "Premise": {
                                            "PremiseNumber": "28",
                                            "SubPremise": {
                                                "SubPremiseName": "строение №2"
                                            },
                                            "PostalCode": {
                                                "PostalCodeNumber": "445043"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone_fax",
                    "formatted": "+7 (8482) 39-13-98",
                    "country": "7",
                    "prefix": "8482",
                    "number": "391398",
                    "info": "офис"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ш. Южное, 28, строение №2",
            "name": "Автомойка",
            "boundedBy": [
                [49.292772999999997, 53.5485167],
                [49.302773000000002, 53.558516699999998]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.297772999999999, 53.553516999999999]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1035477102",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1097063625",
                    "docid": "1346441",
                    "featureData": ""
                },
                "name": "Автомойка ФлагманЪ",
                "names": ["Автомойка ФлагманЪ"],
                "address": "Самарская обл., Тольятти г., ул. Ботаническая, 20а",
                "postalCode": "445000",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Ботаническая, 20а",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Ботаническая улица",
                                        "Premise": {
                                            "PremiseName": "20а",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445000"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 74-34-34",
                    "country": "7",
                    "prefix": "8482",
                    "number": "743434"
                }],
                "Hours": {
                    "Availability": {
                        "Everyday": "",
                        "TwentyFourHours": ""
                    },
                    "text": "круглосуточно"
                },
                "Geo": {
                    "kind": "locality",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Ботаническая, 20а",
            "name": "Автомойка ФлагманЪ",
            "boundedBy": [
                [49.294294000000001, 53.539859700000001],
                [49.304293999999999, 53.549859699999999]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.299294000000003, 53.54486]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1068799110",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1068799110",
                    "docid": "2162912",
                    "featureData": "H4sIAAAAAAAAAM2U3QqDMAyF7\/cuYn+SNIHiu8jWgeA20TnY26+iOIUxpuDwqslpIB9JT\/055Pe2DskjL9vQZAc\/EzLfHxY1aMfKoU+Hi6atqrIIdVKcMi0IWtgJ+3Sq++PtUuXXZxeTAbbOkbE+nchjvxj3XUgwlkzkdzK0\/ojIzMpoICtbIjI7J4CEahHiTyR9rR7x1wxPEywb3t\/IUCveJRnFJ7dPss4KuFsyWmFS2NKbYEUJm7jR72TzPP55LxjMVd8FBQAA",
                    "Snippet": {
                        "FeatureSet": ["car_wash_type", "car_valeting", "tire_blacking", "car_waxing"]
                    }
                },
                "name": "Автомойка Автосауна",
                "names": ["Автомойка Автосауна"],
                "address": "Самарская обл., Тольятти г., ул. Тополиная, 24а",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Тополиная, 24а",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Тополиная улица",
                                        "Premise": {
                                            "PremiseName": "24а"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (927) 268-54-15",
                    "country": "7",
                    "prefix": "927",
                    "number": "2685415"
                }],
                "Hours": {
                    "Availability": {
                        "Everyday": "",
                        "TwentyFourHours": ""
                    },
                    "text": "круглосуточно"
                },
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                },
                "Features": [{
                    "type": "bool",
                    "id": "tire_blacking",
                    "name": "чернение резины",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "cafe",
                    "name": "кафе",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "car_valeting",
                    "name": "химчистка салона",
                    "value": true
                }, {
                    "type": "bool",
                    "id": "car_waxing",
                    "name": "нанесение защитного воска",
                    "value": true
                }, {
                    "type": "enum",
                    "id": "car_wash_type",
                    "name": "мойка",
                    "value": ["бесконтактная"],
                    "values": ["бесконтактная"]
                }, {
                    "type": "text",
                    "id": "washing_zones",
                    "name": "количество моечных зон",
                    "value": "4"
                }],
                "Snippet": {
                    "FeatureSet": ["car_wash_type", "car_valeting", "tire_blacking", "car_waxing"]
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Тополиная, 24а",
            "name": "Автомойка Автосауна",
            "boundedBy": [
                [49.339252000000002, 53.535136700000002],
                [49.349252, 53.5451367]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.344251999999997, 53.540137000000001]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1058264707",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1058264707",
                    "docid": "2456950",
                    "featureData": "H4sIAAAAAAAAAM2U3QrCMAyF732X0WT9DYS9S9EKg6ljc8Le3srG3LxQUTZKL5qcXpwvJ1A+Bn\/tmpDdfNWFttjxQih4uKRGhdaBNSzGh7ar66oMTVYeCiStkJwlx2Ku8\/5yqv25f9REJrdgpNIsZvLkF+vBxZCWLGbysxmt3yO65BEdJIj4FcnLHHKaY8MUNwgPjVotPPwrs3ggTbK4TbMaGfyIpiQBuVzhB7RlH7\/BO\/dohcEYBQAA",
                    "Snippet": {
                        "FeatureSet": ["car_wash_type", "tire_blacking", "car_polishing"]
                    }
                },
                "name": "ЭкоМойка",
                "names": ["ЭкоМойка"],
                "address": "Самарская обл., Тольятти, Коммунальная, 32, ТЦ Арбуз",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти, Коммунальная, 32, ТЦ Арбуз",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Коммунальная",
                                        "Premise": {
                                            "PremiseNumber": "32",
                                            "SubPremise": {
                                                "SubPremiseName": "ТЦ Арбуз"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "url": "http:\/\/ekomoyka.org",
                "urls": ["http:\/\/ekomoyka.org"],
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 61-88-10",
                    "country": "7",
                    "prefix": "8482",
                    "number": "618810"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                },
                "Features": [{
                    "type": "bool",
                    "id": "car_polishing",
                    "name": "полировка",
                    "value": true
                }, {
                    "type": "enum",
                    "id": "car_wash_type",
                    "name": "мойка",
                    "value": ["ручная", "комплексная", "выездная", "колес"],
                    "values": ["ручная", "комплексная", "выездная", "колес"]
                }, {
                    "type": "text",
                    "id": "washing_zones",
                    "name": "количество моечных зон",
                    "value": "10"
                }, {
                    "type": "bool",
                    "id": "tire_blacking",
                    "name": "чернение резины",
                    "value": true
                }],
                "Snippet": {
                    "FeatureSet": ["car_wash_type", "tire_blacking", "car_polishing"]
                }
            },
            "description": "Самарская обл., Тольятти, Коммунальная, 32, ТЦ Арбуз",
            "name": "ЭкоМойка",
            "boundedBy": [
                [49.302349, 53.555786699999999],
                [49.312348999999998, 53.565786699999997]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.307349000000002, 53.560786999999998]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1107867337",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1107867337",
                    "docid": "1811931",
                    "featureData": ""
                },
                "name": "БЕЛАЯ МОЙКА",
                "names": ["БЕЛАЯ МОЙКА"],
                "address": "Самарская обл., Тольятти г., Новый пр-д, 8",
                "postalCode": "445037",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., Новый пр-д, 8",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "город Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "проезд Новый",
                                        "Premise": {
                                            "PremiseNumber": "8",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445037"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 72-05-31",
                    "country": "7",
                    "prefix": "8482",
                    "number": "720531"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., Новый пр-д, 8",
            "name": "БЕЛАЯ МОЙКА",
            "boundedBy": [
                [49.280062000000001, 53.511092699999999],
                [49.290061999999999, 53.521092699999997]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.285062000000003, 53.516092999999998]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1059782248",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1059782248",
                    "docid": "1813032",
                    "featureData": ""
                },
                "name": "МИР М",
                "names": ["МИР М"],
                "address": "Самарская обл., Тольятти г., ул. Коммунальная, 40",
                "postalCode": "445000",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Коммунальная, 40",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "город Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "улица Коммунальная",
                                        "Premise": {
                                            "PremiseNumber": "40",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445000"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 39-09-25",
                    "country": "7",
                    "prefix": "8482",
                    "number": "390925"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Коммунальная, 40",
            "name": "МИР М",
            "boundedBy": [
                [49.294848000000002, 53.556352699999998],
                [49.304848, 53.566352700000003]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.299847999999997, 53.561352999999997]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1041248947",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1041248947",
                    "docid": "1813992",
                    "featureData": ""
                },
                "name": "Турал автомойка",
                "names": ["Турал автомойка"],
                "address": "Самарская обл., Тольятти г., ул. Дзержинского, 76",
                "postalCode": "445032",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Дзержинского, 76",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "город Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "улица Дзержинского",
                                        "Premise": {
                                            "PremiseNumber": "76",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445032"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 41-68-78",
                    "country": "7",
                    "prefix": "8482",
                    "number": "416878"
                }],
                "Hours": {
                    "Availability": {
                        "Everyday": "",
                        "Interval": ""
                    },
                    "text": "08:00-23:00"
                },
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Дзержинского, 76",
            "name": "Турал автомойка",
            "boundedBy": [
                [49.284652000000001, 53.532032700000002],
                [49.294651999999999, 53.5420327]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.289651999999997, 53.537033000000001]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1064401577",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1014741728",
                    "docid": "2279984",
                    "featureData": ""
                },
                "name": "Элита Автомойка",
                "names": ["Элита Автомойка"],
                "address": "Самарская обл., Тольятти г., ул. Офицерская, 14",
                "postalCode": "445044",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Офицерская, 14",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "город Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "улица Офицерская",
                                        "Premise": {
                                            "PremiseNumber": "14",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445044"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 33-82-96",
                    "country": "7",
                    "prefix": "8482",
                    "number": "338296"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Офицерская, 14",
            "name": "Элита Автомойка",
            "boundedBy": [
                [49.305537999999999, 53.537008700000001],
                [49.315537999999997, 53.547008699999999]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.310538000000001, 53.542009]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1108140442",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1120878147",
                    "docid": "2289439",
                    "featureData": ""
                },
                "name": "Автоблеск Автомойка",
                "names": ["Автоблеск Автомойка"],
                "address": "Самарская обл., Тольятти, Тополиная, 1б",
                "postalCode": "445047",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти, Тополиная, 1б",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Тополиная",
                                        "Premise": {
                                            "PremiseName": "1б",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445047"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 20-41-60",
                    "country": "7",
                    "prefix": "8482",
                    "number": "204160"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти, Тополиная, 1б",
            "name": "Автоблеск Автомойка",
            "boundedBy": [
                [49.342477000000002, 53.540629699999997],
                [49.352477, 53.550629700000002]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.347476999999998, 53.545630000000003]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1040774554",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1040774554",
                    "docid": "2288843",
                    "featureData": ""
                },
                "name": "Автомойка в Девятом",
                "names": ["Автомойка в Девятом"],
                "address": "Самарская обл., Тольятти, Туполева, 12а",
                "postalCode": "445040",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти, Туполева, 12а",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Туполева",
                                        "Premise": {
                                            "PremiseName": "12а",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445040"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 53-16-28",
                    "country": "7",
                    "prefix": "8482",
                    "number": "531628"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти, Туполева, 12а",
            "name": "Автомойка в Девятом",
            "boundedBy": [
                [49.296720000000001, 53.517067699999998],
                [49.306719999999999, 53.527067700000003]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.301720000000003, 53.522067999999997]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1108126211",
                "internal": {
                    "group_size": "1",
                    "email": "konturavto.63@mail.ru",
                    "geoid": "11131",
                    "company_id": "1023352359",
                    "docid": "1045550",
                    "featureData": "H4sIAAAAAAAAALNJS00sKS1K1S1LzClNLbbjskERsLMpLi0oyMlMLdLNTLEztDQwMjA1M7a0sNFHFreBqDW00YdqSs7PLUjMqwTJGRkYmRgbW5paGtnoIwnDrQGyjU0NTQzNLMxASpCEERyoqQPoMlOSXAahDOCWEuVSMl1mPChdZm5oZkLAZfroKQ8AWhHpDYsCAAA="
                },
                "name": "Контур Авто",
                "names": ["Контур Авто"],
                "address": "Самарская обл., Тольятти г., ул. Комсомольская, 91",
                "postalCode": "445011",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Комсомольская, 91",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Комсомольская улица",
                                        "Premise": {
                                            "PremiseNumber": "91",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445011"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "url": "http:\/\/www.ka63.ru",
                "urls": ["http:\/\/www.ka63.ru", "http:\/\/winca.ru"],
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "Автотюнинг",
                    "internal": {
                        "id": "184105250"
                    }
                }, {
                    "name": "Автоаксессуары",
                    "internal": {
                        "id": "184105286"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 77-63-00",
                    "country": "7",
                    "prefix": "8482",
                    "number": "776300"
                }, {
                    "type": "phone",
                    "formatted": "+7 (8482) 77-63-33",
                    "country": "7",
                    "prefix": "8482",
                    "number": "776333"
                }],
                "Hours": {
                    "Availability": {
                        "Monday": "",
                        "Tuesday": "",
                        "Wednesday": "",
                        "Thursday": "",
                        "Friday": "",
                        "Saturday": "",
                        "Interval": ""
                    },
                    "text": "пн-сб 09:00-19:00"
                },
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                },
                "Features": [{
                    "type": "bool",
                    "id": "production",
                    "name": "производство",
                    "value": false
                }, {
                    "type": "bool",
                    "id": "sale",
                    "name": "продажа",
                    "value": true
                }]
            },
            "description": "Самарская обл., Тольятти г., ул. Комсомольская, 91",
            "name": "Контур Авто",
            "boundedBy": [
                [49.398397000000003, 53.508484709999998],
                [49.408397000000001, 53.518484710000003]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.403396999999998, 53.513485000000003]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1030319421",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1030319421",
                    "docid": "2279681",
                    "featureData": ""
                },
                "name": "Кама-Сервис Мойка",
                "names": ["Кама-Сервис Мойка"],
                "address": "Самарская обл., Тольятти г., ул. Тополиная, 24а",
                "postalCode": "445030",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Тополиная, 24а",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "город Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "улица Тополиная",
                                        "Premise": {
                                            "PremiseName": "24а",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445030"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 75-30-32",
                    "country": "7",
                    "prefix": "8482",
                    "number": "753032"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Тополиная, 24а",
            "name": "Кама-Сервис Мойка",
            "boundedBy": [
                [49.339252000000002, 53.535136700000002],
                [49.349252, 53.5451367]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.344251999999997, 53.540137000000001]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1031337501",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1019442288",
                    "docid": "1344028",
                    "featureData": ""
                },
                "name": "Мойка`R СК Система",
                "names": ["Мойка`R СК Система"],
                "address": "Самарская обл., Тольятти г., ш. Южное, 24",
                "postalCode": "445047",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ш. Южное, 24",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Южное шоссе",
                                        "Premise": {
                                            "PremiseNumber": "24",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445047"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 66-44-49",
                    "country": "7",
                    "prefix": "8482",
                    "number": "664449"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ш. Южное, 24",
            "name": "Мойка`R СК Система",
            "boundedBy": [
                [49.300812999999998, 53.547618700000001],
                [49.310813000000003, 53.557618699999999]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.305813000000001, 53.552619]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1092088748",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1076071944",
                    "docid": "1338689",
                    "featureData": ""
                },
                "name": "Все для автомоек центр автохимии",
                "names": ["Все для автомоек центр автохимии"],
                "address": "Самарская обл., Тольятти г., ул. Шлютова, 9",
                "postalCode": "445019",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Шлютова, 9",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Шлютова улица",
                                        "Premise": {
                                            "PremiseNumber": "9",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445019"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "Автокосметика, автохимия",
                    "internal": {
                        "id": "184105294"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 25-13-33",
                    "country": "7",
                    "prefix": "8482",
                    "number": "251333"
                }, {
                    "type": "phone",
                    "formatted": "+7 (927) 777-02-51",
                    "country": "7",
                    "prefix": "927",
                    "number": "7770251"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Шлютова, 9",
            "name": "Все для автомоек центр автохимии",
            "boundedBy": [
                [49.392127000000002, 53.517136700000002],
                [49.402127, 53.5271367]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.397126999999998, 53.522137000000001]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1127044383",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1080463324",
                    "docid": "1341955",
                    "featureData": ""
                },
                "name": "Автомойка ИП Коо В.А.",
                "names": ["Автомойка ИП Коо В.А."],
                "address": "Самарская обл., Тольятти г., ул. Дзержинского, 25",
                "postalCode": "445039",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Дзержинского, 25",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Дзержинского улица",
                                        "Premise": {
                                            "PremiseNumber": "25",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445039"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "Шиномонтаж",
                    "internal": {
                        "id": "184105260"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 50-72-27",
                    "country": "7",
                    "prefix": "8482",
                    "number": "507227"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Дзержинского, 25",
            "name": "Автомойка ИП Коо В.А.",
            "boundedBy": [
                [49.310712000000002, 53.528366699999999],
                [49.320712, 53.538366699999997]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.315711999999998, 53.533366999999998]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1013603796",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1010837897",
                    "docid": "244802",
                    "featureData": ""
                },
                "name": "Автосауна Гавань",
                "names": ["Автосауна Гавань"],
                "address": "Самарская обл., Тольятти г., ул. Тополиная, 49",
                "postalCode": "445030",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Тополиная, 49",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Тополиная улица",
                                        "Premise": {
                                            "PremiseNumber": "49",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445030"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "Шиномонтаж",
                    "internal": {
                        "id": "184105260"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 73-46-66",
                    "country": "7",
                    "prefix": "8482",
                    "number": "734666"
                }],
                "Hours": {
                    "Availability": {
                        "Everyday": "",
                        "Interval": ""
                    },
                    "text": "08:00-23:00"
                },
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Тополиная, 49",
            "name": "Автосауна Гавань",
            "boundedBy": [
                [49.341405000000002, 53.528979700000001],
                [49.351405, 53.538979699999999]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.346404999999997, 53.53398]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1049844523",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1049844523",
                    "docid": "1040578",
                    "featureData": "H4sIAAAAAAAAALNJS00sKS1K1S1LzClNLbbjskERsLOBUAY2+lB+cWlBQU5mapFuZoqdkYGRiZG5paGFiY0+srhNcn5uQWJeJUyNgamppYGZjT6SMNwaINvY1NDE0NzQzMTYRh9JGMGBWq2P7lYA0E4Pbb0AAAA="
                },
                "name": "Волга-КомАвто Зарель",
                "names": ["Волга-КомАвто Зарель"],
                "address": "Самарская обл., Тольятти г., ул. Коммунальная, 27",
                "postalCode": "445043",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти г., ул. Коммунальная, 27",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти город",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Коммунальная улица",
                                        "Premise": {
                                            "PremiseNumber": "27",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445043"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "Автомобильные грузоперевозки",
                    "internal": {
                        "id": "184108175"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 39-08-33",
                    "country": "7",
                    "prefix": "8482",
                    "number": "390833",
                    "info": "охрана"
                }],
                "Hours": {
                    "Availability": {
                        "Monday": "",
                        "Tuesday": "",
                        "Wednesday": "",
                        "Thursday": "",
                        "Friday": "",
                        "Interval": ""
                    },
                    "text": "пн-пт 08:00-17:00, перерыв 11:30-12:30"
                },
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти г., ул. Коммунальная, 27",
            "name": "Волга-КомАвто Зарель",
            "boundedBy": [
                [49.300175000000003, 53.553550700000002],
                [49.310175000000001, 53.5635507]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.305174999999998, 53.558551000000001]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1088192426",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1088192426",
                    "docid": "1047082",
                    "featureData": "H4sIAAAAAAAAAF2P0QqDMAxF3\/cvkqZNbQOh\/1JcB4K6outgfz9B3apPufdwHm7kkeKrzKl5x6GkJdzkBIJsRwnsfSk5D32am\/4ekC0he8deoOYnSStN2jF6ukjdc8xx+hyOoZaVFajwb8uajUVChy0ZgQr\/y74Prg99AYGHJXjiAAAA"
                },
                "name": "ЧП Саломатин Р.В.",
                "names": ["ЧП Саломатин Р.В."],
                "address": "Самарская обл., Тольятти, Баныкина, 7",
                "postalCode": "445020",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти, Баныкина, 7",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Баныкина",
                                        "Premise": {
                                            "PremiseNumber": "7",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445020"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "АЗС",
                    "internal": {
                        "id": "184105274"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 63-77-74",
                    "country": "7",
                    "prefix": "8482",
                    "number": "637774"
                }],
                "Hours": {
                    "Availability": {
                        "Everyday": "",
                        "Interval": ""
                    },
                    "text": "08:00-21:00"
                },
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти, Баныкина, 7",
            "name": "ЧП Саломатин Р.В.",
            "boundedBy": [
                [49.398180000000004, 53.493149709999997],
                [49.408180000000002, 53.503149710000002]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.403179999999999, 53.498150000000003]
        }
    }, {
        "type": "Feature",
        "properties": {
            "CompanyMetaData": {
                "id": "1088869588",
                "internal": {
                    "group_size": "1",
                    "geoid": "11131",
                    "company_id": "1020968814",
                    "docid": "1342033",
                    "featureData": ""
                },
                "name": "Аркос автосервис",
                "names": ["Аркос автосервис"],
                "address": "Самарская обл., Тольятти, Карла Маркса, 1",
                "postalCode": "445004",
                "AddressDetails": {
                    "Country": {
                        "AddressLine": "Самарская обл., Тольятти, Карла Маркса, 1",
                        "CountryNameCode": "RU",
                        "CountryName": "Россия",
                        "AdministrativeArea": {
                            "AdministrativeAreaName": "Самарская область",
                            "SubAdministrativeArea": {
                                "Locality": {
                                    "LocalityName": "Тольятти",
                                    "Thoroughfare": {
                                        "ThoroughfareName": "Карла Маркса",
                                        "Premise": {
                                            "PremiseNumber": "1",
                                            "PostalCode": {
                                                "PostalCodeNumber": "445004"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "Categories": [{
                    "name": "Автомойки",
                    "internal": {
                        "id": "184105244"
                    }
                }, {
                    "name": "Автосервисы, автотехцентры",
                    "internal": {
                        "id": "184105246"
                    }
                }],
                "Phones": [{
                    "type": "phone",
                    "formatted": "+7 (8482) 20-81-70",
                    "country": "7",
                    "prefix": "8482",
                    "number": "208170"
                }, {
                    "type": "phone",
                    "formatted": "+7 (8482) 20-73-25",
                    "country": "7",
                    "prefix": "8482",
                    "number": "207325"
                }],
                "Geo": {
                    "kind": "house",
                    "precision": "exact"
                }
            },
            "description": "Самарская обл., Тольятти, Карла Маркса, 1",
            "name": "Аркос автосервис",
            "boundedBy": [
                [49.391294000000002, 53.518269699999998],
                [49.401294, 53.528269700000003]
            ]
        },
        "geometry": {
            "type": "Point",
            "coordinates": [49.396293999999997, 53.523269999999997]
        }
    }]
};