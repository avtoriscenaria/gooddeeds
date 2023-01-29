import { HOST } from 'src/constants/api'

export const useApi = () => {

    const request = async ({method, url}: any) => {
        try {
            const res = await fetch(`${HOST}${url}`, {method}).then(res => res.json())
        console.log('res', res)
        } catch (e: any) {
            console.log('e', e.message)
        }
        
    }

    return {request}
}