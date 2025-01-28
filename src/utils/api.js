const API_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const signup = async (date) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(date),
    }
    );

    return response.json();
};

export const forgot = async (date) => {
    const response = await fetch(`${API_URL}/auth/forgot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(date),
    }
    );

    return response.json();
};

export const signin = async (date) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(date),
    }
    );
    return response.json();
};


export const fetchValidToken = async (token) => {
    const response = await fetch(`${API_URL}/auth/valid-token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.value}`,
        },
    }
    );
    return response;
};

export const fetchRefreshToken = async (date) => {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: date
    }
    );
    return response;
};


export const fetchConfirmEmail = async (id) => {
    console.log('fetchConfirmEmail', id);
    const response = await fetch(`${API_URL}/auth/confirm-email/${id}`);
    return response.status;
};
export const fetchSetPassword = async (id, password) => {
    const response = await fetch(`${API_URL}/auth/set-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id, password: password }),
    }
    );

    return response.status;
};


export const fetchProfile = async (token) => {
    const response = await fetch(`${API_URL}/user/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    }
    );

    return response.json();
};

export const fetchPeople = async () => {
    const response = await fetch(`${API_URL}/people`);
    return response.json();
};

export const getUserAvatar = async (personData, token) => {
    const response = await fetch(`${API_URL}/user/avatar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(personData)
    });

    return response.json();
};

export const setPayments = async (personData) => {
    console.log(personData);
    const response = await fetch(`${API_URL}/pay/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData)
    });

    return response.json();
};

export const getUserAvatars = async (personData, token) => {
    const response = await fetch(`${API_URL}/user/avatars`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(personData)
    });

    return response.json();
};

export const addPerson = async (personData, token) => {
    const response = await fetch(`${API_URL}/user/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(personData),
    });
    return response;
};


export const getUsersAdmin = async (token) => {
    const response = await fetch(`${API_URL}/admin/get_users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    }
    );
    return response.json();
};

export const getPeoplesAdmin = async (token, data) => {
    const response = await fetch(`${API_URL}/admin/get_peoples`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }
    );
    return response.json();
};

export const getAvatarsAdmin = async (token, data) => {
    const response = await fetch(`${API_URL}/admin/get_avatar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }
    );
    return response.json();
};


export const setPreview = async (data) => {
    const response = await fetch(`${API_URL}/admin/set_preview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    );
    return response.json();
};

export const setAll = async (data) => {
    const response = await fetch(`${API_URL}/admin/set_all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    );
    return response.json();
};
