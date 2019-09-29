import moment from 'moment';
import 'moment/locale/zh-cn';

export default {
    formatDate(date: any) {
        return date ? moment(date).format('YYYY-MM-DD') : '';
    },
    formatTime(date: any) {
        return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
    },
};
