// compression function
export function compress(obj: object) {
    let json = JSON.stringify(obj);
    return btoa(json);
}
// decompression function
export function deCompress(base64: string) {
    let json = atob(base64);
    return JSON.parse(json);
}