import { State } from '../entity/invoice.entity';

export const InoviceSeed = [
	{
		amount: 1,
		invoiceNumber: 'INV0001',
		coin: 'ETH',
		invoiceTo: '0xa25001989c1F95d55ADFE6f32BE6ec11aF08019a',
		invoiceFrom: '0x86d737C618C434d7CC31Be930630A06888580273',
		status: State.UnPaid,
	},
	{
		amount: 10,
		invoiceNumber: 'INV0002',
		coin: 'ETH',
		invoiceTo: '0xa25001989c1F95d55ADFE6f32BE6ec11aF08019a',
		invoiceFrom: '0x86d737C618C434d7CC31Be930630A06888580273',
		status: State.UnPaid,
	},
	{
		amount: 1,
		invoiceNumber: 'INV0003',
		coin: 'ETH',
		invoiceTo: '0xa25001989c1F95d55ADFE6f32BE6ec11aF08019a',
		invoiceFrom: '0x86d737C618C434d7CC31Be930630A06888580273',
		status: State.UnPaid,
	},
	{
		amount: 2,
		invoiceNumber: 'INV0004',
		coin: 'ETH',
		invoiceTo: '0xa25001989c1F95d55ADFE6f32BE6ec11aF08019a',
		invoiceFrom: '0x86d737C618C434d7CC31Be930630A06888580273',
		status: State.UnPaid,
	},
	{
		amount: 1,
		invoiceNumber: 'INV0005',
		coin: 'ETH',
		invoiceTo: '0xa25001989c1F95d55ADFE6f32BE6ec11aF08019a',
		invoiceFrom: '0x86d737C618C434d7CC31Be930630A06888580273',
		status: State.UnPaid,
	},
];
