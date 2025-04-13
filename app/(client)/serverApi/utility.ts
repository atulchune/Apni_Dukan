export const getProductById = async (Id:number)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/productsId?Id=${Id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.message
        } else {
            console.log('error in fetch Product detail api');
        }
    } catch (error) {
        console.error("Error form server:- ", error);
    }
}


export const getCategory = async ()=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.data
        } else {
            console.log('error in fetch Product detail api');
        }
    } catch (error) {
        console.error("Error form server:- ", error);
    }
}


export const getMyOrders = async (userId:string)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/getorderdetail?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.data
        } else {
            console.log('error in fetch Product detail api');
        }
    } catch (error) {
        console.error("Error form server:- ", error);
    }
}