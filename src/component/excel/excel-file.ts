import ExcelJS from 'exceljs'

import {TraceExcelArray} from "../../interface-type/interface-type.ts";
import FileSaver from "file-saver";
import {useApp} from "../../custom-hook/useApp.ts";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";


export const useExcelFile = () => {
    const {exchanges} = useAppSelector((state) => state.app)

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet("Riggs Traces")


    const styleWorkBook = () => {
        sheet.eachRow(function (row) {
          row.eachCell(function (cell) {
              cell.style = {font: {bold: true, name: "Time New Roman", size: 16}}
              cell.alignment = {vertical: 'middle', horizontal: 'center'}
          })
        })
    }

    const traceExcelFileHeader = () => {
        sheet.properties.defaultRowHeight = 20;
        sheet.columns = [
            {
                header: "Method",
                key: 'method',
                width: 10
            },
            {
                header: "Status",
                key: 'status',
                width: 10
            },
            {
                header: "URI",
                key: 'uri',
                width: 70
            },
            {
                header: "Time-Stamp",
                key: 'timestamp',
                width: 30
            }
        ]
    }

    const addTraceData = () => {
        exchanges?.map(trace => {
            sheet.addRow({
                method: trace.request?.method,
                status: trace.response.status,
                uri: trace.request.uri,
                timestamp: trace.timestamp
            })
        })
    }

    const onClickCreateRiggsTraceExcelFile = () => {
        traceExcelFileHeader()
        styleWorkBook()
        addTraceData()
        workbook.xlsx.writeBuffer()
            .then(data => {
                const blob = new Blob([data], {
                    type: "'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
                });
                FileSaver.saveAs(blob, "riggs-traces.xlsx")
            })
    }

    return {
        onClickCreateRiggsTraceExcelFile
    }

}