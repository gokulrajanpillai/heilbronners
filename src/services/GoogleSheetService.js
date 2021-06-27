const PublicGoogleSheetsParser = require("public-google-sheets-parser");
const SpreadSheetId = `1jbanrFoGh9NhZyDaYL3O6zcjIPLAVv3LWI97k0x88To`;
// const SpreadSheetUrl = `https://docs.google.com/spreadsheets/d/${SpreadSheetId}/edit#gid=1967547003`;

class GoogleSheetService {
  /**
   *  Returns spreadsheet data
   * @returns
   */
  static async RetrieveTopics() {
    return new Promise(async (resolve, reject) => {
      try {
        const parser = new PublicGoogleSheetsParser(SpreadSheetId);
        parser.parse().then((items) => {
          // let data = items.map((item) => ({
          //   text: item.Topic,
          //   id: item.ID,
          // }));
          // resolve(data);
          resolve(items);
        });
      } catch (err) {
        reject(err);
      }
    });
  }


  /**
   *  Returns spreadsheet data for each sheet
   * @returns
   */
  static async RetrieveSubTopics(topic) {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log("SpreadsheetId: ", SpreadSheetId, " Topic: ", topic)
        const parser = new PublicGoogleSheetsParser(SpreadSheetId, topic);
        parser.parse().then((items) => {
          // let data = items.map((item) => ({
          //   category: item.Category,
          //   website: item.Website,
          // }));
          // console.log("retrieved items : ", JSON.stringify(items))
          // resolve({ text: JSON.stringify(items), id: Math.floor(Math.random() * 100)});
          resolve(items);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default GoogleSheetService;
