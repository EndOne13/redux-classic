import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";
import {addCashAction, getCashAction} from "./store/cashReducer";
import {fetchCustomers} from "./asyncAction/customers";

function App() {
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cashReducer.cash)
    const customers = useSelector(state => state.customerReducer.customers)

    const addCash = (cash) => {
        dispatch(addCashAction(cash))
    }

    const getCash = (cash) => {
        dispatch(getCashAction(cash))
    }

    const addCustomer = (name) => {
        const customer = {
            name, id: Date.now()
        }
        dispatch(addCustomerAction(customer))
    }

    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id))
    }

    return (<div className="App">
        <div style={{fontSize: '3rem'}}>Баланс: {cash}</div>
        <div style={{display: 'flex'}}>
            <button onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>
            <button onClick={() => getCash(Number(prompt()))}>Снять со счетан</button>
            <button onClick={() => addCustomer(prompt())}>Добавлять клиента</button>
            <button onClick={() => dispatch(fetchCustomers())}>Получать клиентов из базы</button>
        </div>
        {customers.length > 0 ?
            <div>
                {customers.map(customer =>
                    <div onClick={() => removeCustomer(customer)} style={{
                        fontSize: '2rem',
                        border: '1px solid black',
                        padding: '10px',
                        marginTop: 5
                    }}> {customer.name} </div>
                )}
            </div>
            :
            <div style={{fontSize: '2rem', marginTop: 20}}>
                Клиентов нет.
            </div>}
    </div>);
}

export default App;
