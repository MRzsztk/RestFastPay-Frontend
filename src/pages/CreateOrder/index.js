import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from "../../services/api";


import listDataAnimation from '../../assets/lotties/27474-food-delivery.json'


import './style.css'

//config lottie file
const defaultOptionsAnimation = {
    loop: true,
    autoplay: true,
    animationData: listDataAnimation,

};


export default function OrderDetails(props) {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const [orderId, setOrderId] = useState(props.match.params.id)
    const [error, setError] = useState(null)
    const [showItems, setShowItems] = useState([])

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token])

    useEffect(() => {
        setItems(items)
    }, [items])
    useEffect(() => {
        setShowItems(allItems)
    }, [allItems])

    useEffect(() => {
        getItemsFromOrder()
    }, [])

    const getItemsFromOrder = async () => {
        try {
            if (!orderId) {
                const newOrder = {
                    "status": "pending"
                }
                const result = await api.post(`order/create`, newOrder, config);
                const { data } = await api.get(`/order/${result.data._id}`, config);
                if (data?.hasOwnProperty('error')) {
                    return setError(data.error)
                }

                history.push(`/order/${result.data._id}`)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

        </>
    );
}