const API_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const signup = async (date) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
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
    const response = await fetch(`${API_URL}/api/auth/forgot`, {
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
    const response = await fetch(`${API_URL}/api/auth/login`, {
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
    const response = await fetch(`${API_URL}/api/auth/valid-token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    }
    );
    return response;
};

export const fetchRefreshToken = async (refreshToken) => {
    const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken })
    });
    return response;
};


export const fetchConfirmEmail = async (id) => {
    const response = await fetch(`${API_URL}/api/auth/confirm-email/${id}`);
    return response.status;
};
export const fetchSetPassword = async (id, password) => {
    const response = await fetch(`${API_URL}/api/auth/set-password`, {
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
    const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    }
    );

    const data = await response.json();
    return data;
};

export const fetchPeople = async () => {
    const response = await fetch(`${API_URL}/people`);
    return response.json();
};

export const getUserAvatar = async (personData, token) => {
    const response = await fetch(`${API_URL}/api/user/avatar`, {
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
    const response = await fetch(`${API_URL}/api/pay/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData)
    });

    return response.json();
};

export const getUserAvatars = async (personData, token) => {
    const response = await fetch(`${API_URL}/api/user/avatars`, {
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
    const response = await fetch(`${API_URL}/api/user/add`, {
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
    const response = await fetch(`${API_URL}/api/admin/get_users`, {
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
    const response = await fetch(`${API_URL}/api/admin/get_peoples`, {
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
    const response = await fetch(`${API_URL}/api/admin/get_avatar`, {
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
    const response = await fetch(`${API_URL}/api/admin/set_preview`, {
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
    const response = await fetch(`${API_URL}/api/admin/set_all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    );
    return response.json();
};


export const getRobokassaSignature = async (data) => {
    const response = await fetch(`${API_URL}/api/pay/robokassa-signature`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }
    );
    return response.json();
};
