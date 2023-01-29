export const LSGetter = (data_name: string) => {
    const data = localStorage.getItem(data_name);

    try {
        if(!data) {
            return data
        }
        return JSON.parse(data)
    } catch (e: any) {
        return data
    }
}