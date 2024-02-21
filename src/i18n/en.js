import englishMessages from 'ra-language-english';
export default {
    ...englishMessages,
    com: {
        search: 'search',
        configuration: 'configuration',
        language: 'language',
        all: 'All',
        coin: 'coin',
        point: 'point',
        point_unit: 'unit',
        related_video: 'related video',
        related_image: 'related image',
        related_audio: 'related audio',
        theme: {
            name: 'theme',
            light: 'light',
            dark: 'dark',
        },
        service: {
            user_all: 'All',
            user_online: 'Online',
            send: 'Send',
            ago: ' ago',
            YEAR: 'year',
            MONTH: 'month',
            DAY: 'day',
            HOUR: 'hour',
            MINUTE: 'min',
            SECOND: 'sec',
        },
        dashboard: {
            monthly_revenue: 'monthly revenue',
            total_users: 'total users',
            total_contents: 'total contents',
            total_adverts: 'total adverts',
            login_cnt_history: 'history on count of history',
            login_cnt: 'login count',
            register_cnt: 'register count',
            content_cnt: 'content count',
            review_cnt: 'review count',
            advert_cnt: 'advert count',
            pending_cash: 'pending cash',
            pending_qa: 'pending qa',
            monthly_history: 'monthly history',
            category_portion: 'category portion',
            category_name: 'category name',
            welcome: {
                title: 'DRIP Admin',
                gohome: 'Go homepage',
                apk: 'Download app',
                subtitle:
                    "user loginy, category, content management, published articles, comments on the process of management.",
            },
        },
        menu: {
            cash: 'cash',
            manage: 'manage',
        },
        validate: {
            required: 'required',
            too_large: 'too large value',
            must_be_number: 'please input number.', //Must be a number
            too_small: 'too small value',
        },
    },
    resources: {
        user: {
            name: 'user',
            fields: {
                name: 'name',
                email: 'email',
                password: 'password',
                uuid: 'uuid',
                birthday: 'birthday',
                money: 'money',
                point: 'point',
                coin: 'coin',
                state: 'online state',
                country: 'country',
                ctime: 'reg time',
                address: 'address',
                zipcode: 'ZIP code',
                city: 'city',            
                role: 'role',
                sex: 'sex',
                phone: 'phone',
                picture: 'picture',
                bank: {
                    name: 'bank name',
                    card: 'card number',
                    owner: 'card owner',
                },
                invite_code: 'invite code',
                login_time: 'login time',
                stat: {
                    login_total: 'total login',
                    login_continue: 'continuous login count',
                    cashin_total: 'total cash in',
                    cashin_continue: 'continuous cash in',
                    cashout_total: 'total cash out',
                },
                allowed_menus: 'allowed menus',
                block: {
                    login: 'block',
                    chat: 'No chatting except friends',
                    friend: 'No adding friend',
                    review: 'No comment to my content',
                    save_view: 'No access to my saving',
                    review_view: 'No access to my review',
                    content_view: 'No access to my content',
                },
            },
            sex: {
                male: 'male',
                female: 'female',
            },
            role: {
                guest: 'guest',
                member: 'member',
                admin: 'admin',
                virtual: 'virtual',
            },
            filter: {
                name: 'search as name',
            },
            tab: {
                bank: 'bank',
                address: 'address',
                identity: 'identity',
                enter_categories: 'enter categories',
            },
            country: {
                CHN: '中国',
                KOR: '한국',
            }
        },
        declare: {
            name: 'declare',
            fields: {
                user_id: 'user',
                declare_id: 'defendant',
                content_id: 'content',
                text: 'text',
                state: 'state',
                ctime: 'create time',
                utime: 'update time',
            },
        },
        setting: {
            name: 'setting',
            fields: {
                black_ip: 'black ip',
                black_name: 'black name',
                first_page: 'first page',
                block: 'block site',
                register_block: 'block register',
                database_perfect: 'database perfect',
                invite_use: 'use invite code',
                invite_mode: 'invite mode',
                invite_mode_mustbe: 'must input invite code',
                invite_mode_normal: 'possible without input',
                attend_day: 'attend day',
                auto_service: 'auto service',
                work_start_time: 'work start time',
                work_end_time: 'work end time',
                chat_free_cnt: 'free visitors to free room (persons)',
                chat_free_time: 'free time in free room (min)',
                chat_free_point: 'Free visitors, point hourly',
                chat_pay_cnt: 'Free visitors in toll room (persons)',
                chat_pay_point: 'visitors of toll room, point hourly',
                chat_delay_point: 'point delay hourly',
                chat_member_cnt: 'visitors(persons)',
                chat_time: 'time(min)',
                chat: 'setting of char room',
                exchange_dollar_rmb: '1 USD -> CNY',
                exchange_dollar_won: '1 USD -> KRW',
                exchange_rate_coin: 'exchange coin rate',
                exchange_rate_point: 'exchange point rate',
                cash_out_rate: 'rate of cash-out(%)',
                cash_out_from: 'convertible coin',
                alarm_review: 'review alarm',
                alarm_content: 'content alarm',
                alarm_cash: 'cash alarm',
                advert_content_cnt: 'advert content count',
                advert_video_cnt: 'advert video count',
                advert_categories: 'advert categories',
                point_view: 'point view',
                point_invite: 'point invite',
                point_first_cash_in: 'point first cash-in',
                point_cash_in: 'point cash-in',
                point_first_cash_out: 'point first cash-out',
                point_follow: 'point for follow',
                point_cash: 'point for cash',
                point_content: 'point for content',
                point_content_cnt: 'point content count',
                point_review: 'point for review',
                point_review_cnt: 'point reiview count',
                point_advert: 'point advert',
                point_advert_cnt: 'point advert count',
                point_attend: 'attend point',
                msg_auto_service: '自动回答文',
                msg_first_login: 'first login message',
                msg_login: 'login message',
                msg_cash: 'cash message',
                msg_qr: 'QR message',
                msg_live: 'live rules',
                msg_select_content: 'content select message',
            },
            virtual: {
                like: 'virtual like',
                view: 'virtual view',
                save: 'virtual save',
                like_from: 'virtual like from',
                view_from: 'virtual view from',
                save_from: 'virtual save from',
                to: 'to',
            },
            tab: {
                cash: 'cash',
                black: 'black',
                alarm: 'alarm',
                advert: 'advert',
                point: 'point',
                chat: 'chat',
                lang: 'translate message',
                service: 'service',
            },
            info: {
                home: 'home',
                service: 'service',
                image: 'image',
                video: 'video',
                chat: 'chat',
                square: 'square',
            },
            select_content: {
                views: 'find(views)',
                likes: 'find(likes)',
                amount: 'amount',
                unit: 'unit',
                is_note: 'send note',
            },
        },
        cash: {
            name: 'cash',
            fields: {
                user_id: 'user',
                money: 'money',
                type: 'type',
                state: 'state',
                messages: 'messages',
                ctime: 'invite time',
                utime: 'update time',
            },
            state: {
                pending: 'pending',
                accepted: 'accepted',
                rejected: 'rejected',
                done: 'done',
                content: 'content'
            },    
            type: {
                in: 'in',
                out: 'out',
                inSum: 'Sum-in',
                outSum: 'Sum-out',
                delta: 'delta',
            },
            days: {
                day1: 'one day',
                day3: '3 days',
                day7: 'a week',
                day15: '15 days',
                month1: 'a month',
                month3: '3 month',
                month6: '6 month',
                year1: 'a year',
                year10: 'all',
            }        
        },
        service: {
            name: 'service',
        },
        gain: {
            name: 'gain',
        },
        cash_history: {
            name: 'cash history',
            fields: {
                user_id: 'user',
                cash: 'cash',
                money: 'money',
                type: 'type',
                state: 'state',
                messages: 'messages',
                ctime: 'reg time',
                utime: 'update time',
            },
            state: {
                pending: 'pending',
                accepted: 'accepted',
                rejected: 'rejected',
                done: 'done',
                content: 'content'
            },
            type: {
                in: 'charge',
                out: 'exchange',
                inSum: 'charge sum',
                outSum: 'exchange sum',
                delta: 'delta',
                cashSum: 'exchange earnings',
                advertSum: 'advert earnings',
            },
            days: {
                1: 'one day',
                3: '3 day',
                7: '7 day',
                15: '15 day',
                30: 'one month',
                91: '3 month',
                182: '6 month',
                365: '1 year',
                3650: 'total',
            }
        },
        pay_history: {
            name: 'pay history',
            fields: {
                user_id: 'user',
                fee: 'fee',
                fee_type: 'fee type',
                agent_type: 'agent',
                type: 'type',
                state: 'state',
                ctime: 'reg time',
            },
        },
        coin_history: {
            name: 'coin history',
            fields: {
                user_id: 'user',
                type: 'type',
                ctime: 'time',
                info: 'info',
                coin: 'coin',
            },
            type: {
                in: 'in',
                out: 'out',
            },
            info: {
                cash_out: 'exchange',
                advert_view: 'advert view',
                cash_set_out: 'coin exchange',
                coin_to_point: 'coin->point',
                content_add: 'add content',
                receive_gift: 'receive gift',
            },
        },
        note: {
            name: 'note',
            fields: {
                sender: 'sender',
                receiver: 'receiver',
                content: 'content',
                ctime: 'reg time',
            },
        },
        notice: {
            name: 'notice',
            fields: {
                level: 'level',
                user_id: 'user',
                title: 'title',
                type: 'type',
                content: 'content',
                ctime: 'reg time',
            },
            type: {
                user: 'user',
                level: 'level',
            },
        },
        black_ip: {
            name: 'black ip',
            fields: {
                ip: 'IP',
                state: 'state',
                utime: 'update time',
            },
        },
        black_name: {
            name: 'black name',
            fields: {
                name: 'name',
                utime: 'update time',
            },
        },
        content: {
            name: 'content',
            fields: {
                name: 'name',
                user_id: 'userID',
                user_name: 'user name',
                tags: 'tags',
                agent_id: 'agent',
                category_id: 'category id',
                type: 'type',
                point: 'point',
                level: 'level',
                first_page: 'first page',
                data: 'data',
                rviews: 'real views',
                vviews: 'virtual views',
                reviews: 'reviews',
                like: 'like',
                state: 'state',                
                delete_reason: 'delete reason',
                delete_point: 'delete point',
                ctime: 'reg time',
                text: 'text',
                from: 'from',
                to: 'to',
                select_present: 'select present',
            },
            type: {
                text: 'text',
                video: 'video',
                image: 'image',
                audio: 'audio',
                ilink: 'inn-link',
                elink: 'ext-link',
            },
            tab: {
                detail: 'detail',
                data: 'data'
            },
            select: {
                amount: 'amount',
                unit: 'unit',
                is_note: 'is note',
            },
            action: {
                state_to_accept: 'allow view',
            },
            err: {
                'The delete reason is required':'请输入删除原因。',
            },
        },
        advert: {
            name: 'advert',
            fields: {
                name: 'name',
                type: 'type',
                text: 'text',
                link: 'link',
                ctime: 'reg time',
                etime: 'end time',
                money: 'money',
                views: 'views',
                positions: 'positions',
            },
        },
        popup: {
            name: 'popup',
            fields: {
                name: 'title',
                description: 'description',
                content: 'content',
                from: 'from',
                to: 'to',
                url: 'url',
                positions: 'positions',
            },
        },
        qa: {
            name: 'QA',
            fields: {
                question: 'question',
                answer: 'answer',
                ctime: 'reg time',
                type: 'type',
                user_id: 'user',
                media: 'media',
            },
            type: {
                etc: 'etc',
                faq: 'faq',
            },
        },
        tag: {
            name: 'tag',
            fields: {
                trans: 'name',
                ctime: 'reg time',
            },
        },
        faq: {
            name: 'FAQ',
            fields: {
                question: 'question',
                answer: 'answer',
                ctime: 'reg time',
                type: 'type',
                user_id: 'user',
                media: 'media',
            },
            type: {
                etc: 'etc',
                faq: 'faq',
            },
        },
        category: {
            name: 'category',
            fields: {
                name: 'name',
                enter_level: 'enter level',
                enter_points: 'enter points',
                parent_id: 'parent id',
                type: 'type',
                allow_funcs: 'allowed funcs',
                description: 'description',
                trans: 'translate',
            },
            tab: {                
                detail: 'detail',
                enter_points: 'enter points',
            },
            trans: {                
                lang: 'language',
                str: 'string',
            },
            allow: {
                write: 'write',
                review: 'review',
                view: 'view',
            },
            enter_points: {
                days: 'allowd time',
                day1: 'a day',
                day7: 'a week',
                day15: '15 days',
                day30: 'a month',
            }
        },
        game: {
            name: 'game',
            fields: {
                name: 'name',
                thumb: 'thumb',
                thumb_bkcolor: 'thumb bkcolor',
                cnt: 'count',
                state: 'state',
                type: 'robot allowed',
                orient: 'horizontal',
                needDown: 'need download',
                addr: 'address',
                pValue: 'value',
                file: 'zip file',
            },
        },
        room: {
            name: 'room',
            fields: {
                block: 'block',
                money: 'money',
                password: 'password',
                cnt: 'total members',
                ctime: 'reg time'
            },
            filter: {
                money: 'search as money',
            },
        },
        robot: {
            name: 'robot',
            fields: {
                name: 'name',
                picture: 'picture',
                country: 'country',
                birthday: 'birthday',
                ctime: 'reg time',
                sex: 'sex',
            },
        },
        vip: {
            name: 'level',
            fields: {
                money: 'money',
                name: 'name',
                discount: 'discount',
                level: 'level',
                is_gift: 'is gift',
                is_voice: 'is voice',
                take_cash_cnt: 'cash count',
                free_room_cnt: 'free room count',
            },
        },
        alarm: {
            name: 'alarm',
            fields: {
                content: 'content',
            },
        },
        login_history: {
            name: 'login history',
            fields: {
                user_id: 'user',
                ip: 'IP',
                login_time: 'login time',
                logout_time: 'logout time',
                secs: 'secs',
                phone_type: 'phone type',
            },
        },
        penal_history: {
            name: 'penal history',
            fields: {
                user_id: 'user',
                ctime: 'reg time',
                ip: 'IP',
                phone_type: 'phone type',
            },
        },
        point_history: {
            name: 'point history',
            fields: {
                user_id: 'user',
                type: 'type',
                ctime: 'reg time',
                info: 'detail',
                point: 'point',
            },
            type: {
                in: 'in',
                out: 'out',
            },
            info: {
                cash_in: 'charge',
                first_cash_in: 'first charge',
                first_cash_out: 'first exchange',
                cashin_continue: 'continue charge',
                content_view: 'view content',
                advert_view: 'view advert',
                content_add: 'add content',
                review_add: 'add review',
                follow: 'follow 10',
                login3: 'continuous login 3 days',
                attend: 'attend',
                charge_point: 'charge point',
                cash_set_out: 'coin exchange',
                coin_to_point: 'coin->point',
                pay_guarantee: 'advert guarantee',
                chat_in_enter_user: 'subscription fee payed by creator',
                chat_in_enter_creator: 'subscription fee payed by user',
                chat_out_enter_user: 'subscription fee paid to user',
                chat_out_enter_creator: 'subscription fee paid to creator',
                chat_out_create: 'room opening fee',
                chat_out_delay: 'room extension fee',
                delete_point: 'delete point',
                enter_category: 'enter category',
                invite: 'invite',
                select_content: 'select content',
                send_gift: 'send gift',
                receive_gift: 'receive gift',
                game_result: 'game result',
            },
        },
        cash_set: {
            name: 'cash set',
            fields: {
                name: 'name',
                type: 'type',
                cash: 'cash',
                money: 'point, coin',
                point: 'point',
                coin: 'coin',
                append: 'append',
                img: 'image',
            },
        },
        gift: {
            name: 'gift',
            fields: {
                name: 'name',
                price: 'price',
                img: 'image',
                ctime: 'reg time',
            },
        },
        gift_history: {
            name: 'gift history',
            fields: {
                sender: 'sender',
                receiver: 'receiver',
                gift_id: 'gift',
                cnt: 'count',
                channel_id: 'channel',
                ctime: 'reg time',
            },
        },
        game_history: {
            name: 'game history',
            fields: {
                result: 'result',
                ctime: 'reg time',
            },
        },
        charge_set: {
            name: 'charge set',
            fields: {
                name: 'name',
                price: 'price',
                money: 'money',
                append: 'append money',
                img: 'image',
            },
        },
        review: {
            name: 'review',
            detail: 'detail',
            fields: {
                user_id: 'user',
                content_id: 'content id',
                level: 'level',
                like: 'like',
                comment: 'comment',
                point: 'point',
                state: 'state',
                delete_reason: 'delete reason',
                delete_point: 'delete point',            
                ctime: 'reg time',
            },
            state: {
                accept: 'accept',
                pending: 'pending',
                delete: 'delete',
            },
        },
        channel: {
            name: 'live',
            fields: {
                logo: 'logo',
                streamKey: 'stream key',
                creator: 'creator',
                mode: 'mode',
                type: 'kind(money)',
                time: 'effective time(min)',
                name: 'name',
                point: 'opening cost(point)',
                perPay: 'admission fees(point)',
                others: 'participant',
                ctime: 'opening date',
                cnt: 'cnt',
                category_id: 'category',
                notification: 'notification',
                state: 'state',
                block_reason: 'reason of block',
            },
            info: {
                free_room: 'free room',
                fix_room: 'fix room',
                time_room: 'time room',
                private: '1:1',
                many: 'many',
            },
            block_reason: {
                a: 'Violation of rule a (politics)',
                b: 'Violation of rule b (obscene)',
                c: 'Violation of rule c (vulgar)',
                d: 'Violation of rule d (weapon)',
                e: 'Violation of rule e (narcotics)',
            }

        },
        live_history: {
            name: 'live history',
            fields: {
                user_id: 'creator',
                name: 'name',
                image: 'logo',
                totalGiftPrice: 'total gift price',
                nCount: 'view count',
                nLike: 'like count',
                startTime: 'start time',
                endTime: 'end time',
            },
        },
    },
    ra: {
        auth: {
            phone: 'Auth ID',
        }
    },

};