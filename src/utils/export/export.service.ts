import { BadRequestException, Injectable } from "@nestjs/common";
import { Column, Workbook, Row } from "exceljs";
import * as tmp from "tmp";

@Injectable()
export class ExportService {
  async exportData<T extends Row[]>(
    worksheetName: string,
    fileName: string,
    columns: Partial<Column>[],
    data: T,
  ): Promise<string> {
    const workbook = new Workbook();

    const sheet = workbook.addWorksheet(worksheetName, {
      pageSetup: {
        paperSize: 9,
        orientation: "landscape",
      },
    });

    sheet.columns = columns;

    sheet.columns.forEach((_, i) => {
      sheet.getCell(`${String.fromCharCode(65 + i)}1`).style.fill = {
        type: "pattern",
        pattern: "lightGray",
        bgColor: { argb: "FF24DE37" },
      };
    });

    sheet.addRows(data);

    const workbookFile = await new Promise((resolve, reject) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: fileName,
          postfix: ".xlsx",
          mode: parseInt("0600", 8),
        },
        async (err, file) => {
          if (err) {
            throw new BadRequestException();
          }

          workbook.xlsx
            .writeFile(file)
            .then(() => {
              resolve(file);
            })
            .catch((err) => {
              throw new BadRequestException(err);
            });
        },
      );
    });

    return workbookFile as string; //path to file;
  }
}
