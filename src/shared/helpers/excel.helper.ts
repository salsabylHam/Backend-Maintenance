import { BadRequestException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';

export const downloadExcel = async function (data: any[]) {
  if (!data || !data.length) {
    throw new BadRequestException('Data is required!');
  }

  const rows = [];
  data.forEach((el) => {
    rows.push(Object.values(el));
  });

  const book = new Workbook();
  const sheet = book.addWorksheet('Page');
  rows.unshift(Object.keys(data[0]));
  sheet.addRows(rows);

  return new Promise((resolve, reject) => {
    tmp.file(
      {
        prefix: 'time-tracking',
        postfix: '.xlsx',
        mode: parseInt('0600', 8),
      },
      async (err, file) => {
        if (err) {
          reject(err);
        }

        book.xlsx
          .writeFile(file)
          .then(() => {
            resolve(file);
          })
          .catch((err) => {
            reject(err);
          });
      },
    );
  });
};
