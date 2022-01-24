import { BaseEmail } from './base';

export class StatisticsMemberEmail extends BaseEmail {
  constructor() {
    super();
    this.extractParams = {
      subject: `Thống kê số người tham gia: LixiNFT`,
      text1: `Thử thôi`,
      text2: 'Không hiểu',
    };
  }
}
