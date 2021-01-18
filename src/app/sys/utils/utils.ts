import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {formatCurrency, formatNumber, formatPercent} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  /**
   * @param requireTitle enable table tittle
   * @param title the table tittle
   * @param titlesTable header row
   * @param columns name of fetched rows ~~ value|format|icon
   * @param data rows on table
   * @param extra extra data or custom information
   */
  drawTable(
    requireTitle: boolean,
    title: string,
    titlesTable: string[],
    columns: string[],
    data: any,
    ...extra: any
  ): string {
    if (titlesTable.length !== columns.length) {
      throw new Error('La cantidad de columnas no coincide');
    }
    let headerTable = '    <table class="table bg-white">\n' + '      <thead>';
    if (requireTitle) {
      headerTable +=
        '<tr>' +
        '        <th colspan="' +
        columns.length +
        '">' +
        title +
        '        </th>' +
        '      </tr>' +
        '<tr>';
    }

    let titlesHeadTable = '';

    titlesTable.forEach((item) => {
      titlesHeadTable += '<th>' + item + '</th>';
    });

    const closeTagTH = '</tr>';

    const bottomHeaderTable = '   </thead><tbody>';
    const bottomTable = '</tbody></table>';

    let bodyTable = '';

    data.forEach((item, key) => {
      // tslint:disable-next-line:triple-equals
      for (let i = 0; i < titlesTable.length; i++) {
        const columnInfo = columns[i].toString().split('|');
        const columnName = columnInfo[0];
        const columnFormat =
          columnInfo.length === 2 ? columns[i].toString().split('|')[1] : '';
        let columnIcon =
          columnInfo.length === 3 ? columns[i].toString().split('|')[2] : '';
        if (columnName === 'custom-column') {
          bodyTable += '<td class="custom-column"></td>';
        } else if (columnName === 'actions') {
          switch (extra[0]) {
            case 0:
              bodyTable +=
                '<td class="' +
                columnName +
                '-' +
                item.id +
                '">' +
                '<i class="fas mdi mdi-marker text-facebook edit_" data-toggle="tooltip" ' +
                'data-placement="top" title="Editar"></i>';
              break;
            case 1:
              bodyTable +=
                '<td class="' +
                columnName +
                '-' +
                item.id +
                '">' +
                '<i class=\'delete-action mdi mdi-delete text-danger ml-4 del_\' data-toggle="tooltip" ' +
                'data-placement="top" title="Eliminar"></i>' +
                '</td>';
              break;
            case 2:
              bodyTable +=
                '<td class="' +
                columnName +
                '-' +
                item.id +
                '">' +
                '<i class="fas mdi mdi-marker text-facebook edit_" data-toggle="tooltip" ' +
                'data-placement="top" title="Editar"></i>' +
                '<i class=\'delete-action mdi mdi-delete text-danger ml-4 del_\' data-toggle="tooltip" ' +
                'data-placement="top" title="Eliminar"></i>' +
                '</td>';
              break;
          }
        } else {
          let columnValue;
          switch (columnFormat) {
            case 'percent':
              columnValue = formatPercent(
                item[columnName],
                this.locale,
                '1.0-3'
              );
              break;
            case 'currency':
              columnValue = formatCurrency(
                item[columnName],
                this.locale,
                '$',
                'MXN'
              );
              break;
            case 'number':
              columnValue = formatNumber(item[columnName], this.locale);
              break;
            default:
              columnValue = item[columnName];
              break;
          }
          if (columnIcon !== '') {
            const icons = JSON.parse(JSON.stringify(extra[0]));
            const icon = icons.find((o) => o.key === columnValue).icon;
            columnIcon =
              '<span class="mdi ' +
              icon +
              ' text-primary ' +
              columnValue +
              '"></span><br>';
            bodyTable +=
              '<td class="' + columnName + '">' + columnIcon + '</td>';
          } else {
            bodyTable +=
              '<td class="text-uppercase ' +
              columnName +
              '">' +
              columnValue +
              '</td>';
          }
        }
      }
      bodyTable += '</tr>';
    });

    return (
      headerTable +
      titlesHeadTable +
      closeTagTH +
      bottomHeaderTable +
      bodyTable +
      bottomTable
    );
    // return headerTable + titlesHeadTable + closeTagTH + bottomHeaderTable;
  }
}
