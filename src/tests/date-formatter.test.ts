import {getFormattedDate} from '../utils/date-formatter';

describe('.getFormattedDate()', () => {
    it('should format the unix timestamp to normal string date', () => {

        //It represents Fri Dec 06 2024 09:16:47 GMT+0400
        const timestamp = 1733462207;

        const formatedDate = getFormattedDate(timestamp);

        expect(formatedDate).toEqual('09:16, Fri Dec 6');
    });
});