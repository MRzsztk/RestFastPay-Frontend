import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function index({ order, handlerOnchange, isChecked, options }) {
    const { _id, tableId, subtotal, vat, total } = order

    return (

        <div className="order-details-card">
            <div className="order-details-body">
                <div className="order-column-left">
                    <p className="order-description">Subtotal:<span className="order-description-value">€{subtotal.toFixed(2)}</span></p>
                    <p className="order-description">VAT:<span className="order-description-value">€{vat.toFixed(2)}</span></p>
                    <p className="order-description order-total">TOTAL:<span className="order-description-value order-total">€{total.toFixed(2)}</span></p>
                </div>
                <div className="order-column-right">
                    <p className="order-description">Table NR:</p>
                    {tableId ? <span className="order-table-number">{tableId?.number}</span> :
                        <select name="table-list" className="table-list" id="table-list" onChange={handlerOnchange} >
                            <option value='all'>-</option>
                            {options && options.map((option, index) => <option key={index} value={option._id} >{option.number}</option>)}
                        </select>
                    }

                </div>
            </div>
            <div className="order-buttons-group">
                <Link className="btn-save" to={`/order/${_id}`}>Save</Link>
            </div>
        </div>
    )
}