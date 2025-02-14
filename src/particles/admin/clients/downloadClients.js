import {clients} from "../../../services/newApi";

export const downloadClients = async () => {
    try {
        const response = await clients.clientsDownload();

        if (response.status !== 200) {
            throw new Error('Ошибка при загрузке файла.');
        }

        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'guests.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        return 'Файл успешно скачан.'
    } catch (error) {
        console.error('Ошибка:', error);
        throw new Error('Не удалось скачать файл.')
    }
}