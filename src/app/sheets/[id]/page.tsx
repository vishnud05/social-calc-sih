"use client";

import {
  SheetModel,
  SpreadsheetComponent,
} from "@syncfusion/ej2-react-spreadsheet";
import { registerLicense } from "@syncfusion/ej2-base";
import { useEffect, useRef, useState } from "react";
import { readSpreadsheet, uploadSpreadsheet } from "./actions";

interface SpreadsheetComponentWithEj2Spreadsheet extends SpreadsheetComponent {
  ej2_spreadsheet: any;
}

export default function App({ params }: { params: { id: string } }) {
  const [sheetData, setSheetData] = useState<SheetModel[]>([]);
  registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVFxWmFZfVpgc19EYVZQTWYuP1ZhSXxXdk1gWH9fcHRURmRcUkI="
  );

  const spreadsheetRef = useRef<SpreadsheetComponentWithEj2Spreadsheet>(null);

  const handleSave = () => {
    spreadsheetRef?.current?.saveAsJson().then(async (json: any) => {
      await uploadSpreadsheet(json.jsonObject.Workbook.sheets, params.id);
      console.log("Data Updated Successfully");
    });
  };

  useEffect(() => {
    readSpreadsheet(params.id).then((data: SheetModel[]) => {
      console.log(data);

      setSheetData(data);
    });
  }, []);

  return (
    <>
      <button
        onClick={handleSave}
        className=" fixed right-10 top-5 bg-blue-600 z-50 p-1 rounded-lg text-white text-sm"
      >
        Save Cloud
      </button>
      <SpreadsheetComponent
        ref={spreadsheetRef}
        height={"100vh"}
        allowCellFormatting={true}
        allowEditing={true}
        allowSave={true}
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
        allowOpen={true}
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        sheets={
          sheetData
            ? sheetData.map((sheet: SheetModel) => {
                return {
                  ...sheet,
                  rows: sheet.rows?.map((row) => {
                    if (row == null) {
                      return {
                        cells: [],
                      };
                    }
                    row.cells?.map((cell) => {
                      if (!cell) {
                        return {
                          value: "",
                        };
                      }
                      return cell;
                    });
                    return row;
                  }),
                  columns: sheet.columns?.map((col) => {
                    if (col == null) {
                      return {};
                    }
                    return col;
                  }),
                };
              })
            : [
                {
                  name: "Sheet 1",
                },
              ]
        }
      >
        {/* <SheetsDirective>
          <SheetDirective name="Monthly Budget">
            <RowsDirective>
              <RowDirective height={30}>
                <CellsDirective>
                  <CellDirective value="Customer Name"></CellDirective>
                  <CellDirective value="Model"></CellDirective>
                  <CellDirective value="Color"></CellDirective>
                  <CellDirective value="Payment Mode"></CellDirective>
                  <CellDirective value="Delivery Date"></CellDirective>
                  <CellDirective value="Amount"></CellDirective>
                </CellsDirective>
              </RowDirective>
            </RowsDirective>
            <RangesDirective>
              <RangeDirective showFieldAsHeader={true}></RangeDirective>
            </RangesDirective>
            <ColumnsDirective>
              <ColumnDirective width={210}></ColumnDirective>
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective> */}
      </SpreadsheetComponent>
    </>
  );
}
