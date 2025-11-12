'use client';



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log(BASE_URL);





const EndPoints = {
    //GET API ---------------//

    LOGIN_API: () =>
        BASE_URL + `auth/login`,
    REGISTER_API: () =>
        BASE_URL + `auth/signup`,

    NOTES_LIST: () => BASE_URL + `notes`,
    NOTES_CREATE: () => BASE_URL + `notes`,
    NOTE_DETAIL: (id) => BASE_URL + `notes/${id}`,
    NOTE_UPDATE: (id) => BASE_URL + `notes/${id}`,

};

Object.freeze(EndPoints);

export default EndPoints;
