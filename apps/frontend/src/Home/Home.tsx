import './Home.css';

import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import Blockies from 'react-blockies';
import Web3 from 'web3';

import { Auth } from '../types';

interface Props {
	auth: Auth;
	onLoggedOut: () => void;
}

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}

interface InvoiceI {
	id: string;
	amount: number;
	invoiceNumber: number;
	coin: string;
	invoiceTo: string;
	invoiceFrom: string;
	status: string;
}

export const Home = ({ auth, onLoggedOut }: Props): JSX.Element => {
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		const { accessToken } = auth;

		fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((response) => response.json())
		.then((invoices: []) => setInvoices(invoices))
		.catch(window.alert);
	}, []);

	const { accessToken } = auth;

	const {
		payload: { publicAddress },
	} = jwtDecode<JwtDecoded>(accessToken);

	const makeInvoicePayment = async (invoice: { invoice: InvoiceI; }) => {
		const invoiceTxn = invoice.invoice;
		const web3 = new Web3((window as any).ethereum);
		const addresses = await web3.eth.getAccounts();
		web3.eth.sendTransaction({
			from: addresses[0],
			to: invoiceTxn.invoiceTo.toLowerCase(),
			value: invoiceTxn.amount.toString()
		}).once('sending', payload => {
			console.log('sending payload', payload);
		}).once('sent', payload => {
			console.log('sent payload', payload);
		}).once('transactionHash', hash => {
			console.log('sending hash', hash);
		}).once('receipt', receipt => {
			let data = {
				status: ''
			};
			if (receipt.status === true) {
				data.status = 'Paid'
			} else {
				data.status = 'Failed'
			}
			fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices/${invoiceTxn.id}`, {
				body: JSON.stringify(data),
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json"
				},
				method: 'POST'
			})
			.then((response) => response.json())
			.then((data) => {
				setInvoices(data.data);
				window.location.reload();
			})
			.catch(window.alert);
		}).on('confirmation', (confNumber, receipt, latestBlockHash) => {
			fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions/new`, {
				body: JSON.stringify(receipt),
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json"
				},
				method: 'POST',
			})
			.then((response) => response.json())
			.catch(window.alert);
		}).on('error', error => {
			console.log('error => ', error);
		}).then((receipt) => {
			fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions/new`, {
				body: JSON.stringify(receipt),
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json"
				},
				method: 'POST',
			})
			.then((response) => response.json())
			.catch(window.alert);
		});
	};

	return (
		<div className="Profile">
			<p>
				Logged in as <Blockies seed={publicAddress} />
			</p>
			<p>
				<button onClick={onLoggedOut}>Logout</button>
			</p>

			<table className="table" id="invoices">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Invoice Number</th>
						<th scope="col">Invoice Amount</th>
						<th scope="col">Invoice Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
				{invoices.map(( invoice: InvoiceI, index: React.Key | null | undefined ) => {
					return (
						<tr key={index}>
							<td>{index}</td>
							<td>{invoice.invoiceNumber}</td>
							<td>{invoice.coin} {invoice.amount}</td>
							<td>{invoice.status}</td>
							<td>
								{(invoice.status.toLowerCase() === 'paid') ? 'successful' : <button onClick={() => makeInvoicePayment({invoice})}>Pay</button>}
								
							</td>
						</tr>
					);
				})}
				</tbody>
			</table>
			
		</div>
	);
};