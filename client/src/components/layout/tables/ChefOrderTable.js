import React, { Fragment, useEffect, useState } from 'react'
import UserDetail from '../../modals/UserDetail'
import moment from 'moment'
import axios from 'axios'
const ChefOrderTable = ({ chefOrders, getChefOrders }) => {
    useEffect(() => {
        console.log(chefOrders)
    }, [])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userDetail, setUserDetail] = useState(null)
    const showUserDetail = (user) => {
        setUserDetail(user)
        setShow(true)
    }

    const onAccept = async (id) => {
        console.log(id)
        try {
            await axios.get(`/api/order/accept/${id}`)
            getChefOrders()
        } catch (err) {
            console.log(err)
        }
    }
    const onReject = async (id) => {
        console.log(id)
        try {
            await axios.get(`/api/order/cancel/${id}`)
            getChefOrders()
        } catch (err) {
            console.log(err)
        }
    }
    const onReady = async (id) => {
        console.log(id)
        try {
            await axios.get(`/api/order/ready/${id}`)
            getChefOrders()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <UserDetail user={userDetail} show={show} handleClose={handleClose} handleShow={handleShow} />

            <div
                className="table-responsive"
            // style="filter: blur(0px) brightness(100%)"
            >
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th className="table-heading">Order Id</th>
                            <th className="table-heading">Date</th>
                            <th className="table-heading">Customer</th>
                            <th className="table-heading">Items</th>
                            <th className="table-heading">Quantity</th>
                            <th className="table-heading">Total(Pkr)</th>
                            {/* <th className="table-heading">Order Type</th> */}
                            <th className="table-heading">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chefOrders.activeOrders.filter(o => o.status === 'Pending').map(order => (
                                <tr key={order._id}>
                                    <td className="table-heading text-break">{order._id}</td>
                                    <td className="table-heading text-break">{moment(order.date).format('MM-dddd-YYYY hh:mm')}</td>
                                    <td className="table-heading text-break">{order.user.firstName}</td>
                                    <td className="table-heading text-break w-25">
                                        <ul className="list-group list-group-flush">
                                            {
                                                order.khaabay.map((k, i) => (
                                                    <li key={i} className='list-group-item'>{k.khaaba.title}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    <td className="table-heading text-break"> <ul className="list-group list-group-flush">
                                        {
                                            order.khaabay.map((k, i) => (
                                                <li key={i} className='list-group-item'>{k.quantity}</li>
                                            ))
                                        }
                                    </ul></td>
                                    <td className="table-heading text-break">{order.totalPrice}</td>
                                    {/* <td className="table-heading text-break">x</td> */}
                                    <td className="table-heading text-break" style={{ width: "20%" }}>
                                        <button className="button buttonar buttona btn-sm"
                                            onClick={() => onAccept(order._id)}>Accept</button>
                                        <button onClick={() => onReject(order._id)} className="button buttonar buttonr btn-sm">Reject</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className="row justify-content-center">
                    <div className="col-4 text-center">
                        {
                            chefOrders.loading && <img className='float-center' width="15%" src="/img/Ellipsis-1s-200px.gif" />

                        }
                    </div>
                </div>
            </div>
            <h5 className="card-title text-center login-heading pt-3">In Progress</h5>
            <div
                className="table-responsive"
            // style="filter: blur(0px) brightness(100%)"
            >
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th className="table-heading">Order Id</th>
                            <th className="table-heading">Date</th>
                            <th className="table-heading">Customer</th>
                            <th className="table-heading">Items</th>
                            <th className="table-heading">Quantity</th>
                            <th className="table-heading">Total(Pkr)</th>
                            <th className="table-heading">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            chefOrders.activeOrders.filter(o => o.status != 'Pending').map(order => (
                                <tr key={order._id}>
                                    <td className="table-heading text-break">{order._id}</td>
                                    <td className="table-heading text-break">{moment(order.date).format('MM-dddd-YYYY hh:mm')}</td>
                                    <td className="table-heading text-break">{order.user.firstName}
                                        <br />
                                        <button onClick={() => showUserDetail(order.user)} className="button buttonar buttond btn-sm">Details</button>
                                    </td>
                                    <td className="table-heading text-break">
                                        <ul className="list-group list-group-flush">
                                            {
                                                order.khaabay.map((k, i) => (
                                                    <li key={i} className="list-group-item">{k.khaaba.title}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    <td className="table-heading text-break">
                                        <ul className="list-group list-group-flush">
                                            {
                                                order.khaabay.map((k, i) => (
                                                    <li key={i} className="list-group-item">{k.quantity}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    < td className="table-heading text-break" > {order.totalPrice}</td>
                                    {/* <td className="table-heading text-break">x</td> */}
                                    <td className="table-heading text-break"><button className="button buttonar buttona btn-sm me-1"
                                        onClick={() => onReady(order._id)}>Ready</button></td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className="row justify-content-center">
                    <div className="col-4 text-center">
                        {
                            chefOrders.loading && <img className='float-center' width="15%" src="/img/Ellipsis-1s-200px.gif" />

                        }
                    </div>
                </div>
            </div >
        </Fragment >
    )
}

export default ChefOrderTable
