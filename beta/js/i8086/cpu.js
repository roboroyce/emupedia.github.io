/*

CPUs:

4004   4-bit registers with  4-bit data bus and 12-bit address bus and  4 KB of memory 0.74  MHz 1971 March
8008   8-bit registers with  8-bit data bus and 14-bit address bus and 16 KB of memory 0.8   MHz 1972 April
8080   8-bit registers with  8-bit data bus and 16-bit address bus and 64 KB of memory 3.125 MHz 1974 April
8085   8-bit registers with  8-bit data bus and 16-bit address bus and 64 KB of memory 6     MHz 1976
8086  16-bit registers with 16-bit data bus and 20-bit address bus and  1 MB of memory 10    MHz 1978 June
8088  16-bit registers with  8-bit data bus and 20-bit address bus and  1 MB of memory 10    MHz 1979 July
80186 16-bit registers with 16-bit data bus and 20-bit address bus and  1 MB of memory 25    MHz 1982 January
80188 16-bit registers with  8-bit data bus and 20-bit address bus and  1 MB of memory 25    MHz 1982 January
80286 16-bit registers with 16-bit data bus and 24-bit address bus and 16 MB of memory 25    MHz 1982 February
80386 32-bit registers with 32-bit data bus and 32-bit address bus and  4 GB of memory 40    MHz 1985 October

FPUs:

8087
80187
80287
80387

Intel 8086/186 CPU
1MB RAM
8072A 3.5" floppy disk controller (1.44MB/720KB)
Fixed disk controller (supports a single hard drive up to 528MB)
Hercules graphics card with 720x348 2-color graphics (64KB video RAM), and CGA 80x25 16-color text mode support
8253 programmable interval timer (PIT)
8259 programmable interrupt controller (PIC)
8042 keyboard controller with 83-key XT-style keyboard
MC146818 real-time clock
PC speaker

 1 AX (primary accumulator)
 2 BX (base, accumulator)
 3 CX (counter, accumulator)
 4 DX (accumulator, extended acc.)

 5 CS Code Segment
 6 DS Data Segment
 7 ES Extra Segment
 8 SS Stack Segment

 9 SI Source Index
10 DI Destination Index
11 BP Base Pointer
12 SP Stack Pointer

13 IP Instruction Pointer

14 Flags - - - - OF DF IF TF SF ZF - AF - PF - CF

CF Carry flag
PF Parity flag
AF Auxiliary carry flag
ZF Zero flag
SF Sign flag
TF Trap flag
IF Interrupt flag
DF Direction flag
OF Overflow flag

*/

'use strict';

class CPU {
	constructor() {
		console.log('CPU i8086 initialised!');

		let self = this;

		// noinspection JSUndefinedPropertyAssignment
		self.B = new ArrayBuffer(28);

		// noinspection JSUndefinedPropertyAssignment
		self.S = new DataView(self.B);

		// noinspection JSUndefinedPropertyAssignment
		self.R = {
			get AL() {
				return self.S.getUint8(0);
			},
			set AL(val) {
				self.S.setUint8(0, val);
			},
			get AH() {
				return self.S.getUint8(1);
			},
			set AH(val) {
				self.S.setUint8(1, val);
			},
			get AX() {
				return self.S.getUint16(0, true);
			},
			set AX(val) {
				self.S.setUint16(0, val, true);
			},
			get BL() {
				return self.S.getUint8(2);
			},
			set BL(val) {
				self.S.setUint8(2, val);
			},
			get BH() {
				return self.S.getUint8(3);
			},
			set BH(val) {
				self.S.setUint8(3, val);
			},
			get BX() {
				return self.S.getUint16(2, true);
			},
			set BX(val) {
				self.S.setUint16(2, val, true);
			},
			get CL() {
				return self.S.getUint8(4);
			},
			set CL(val) {
				self.S.setUint8(4, val);
			},
			get CH() {
				return self.S.getUint8(5);
			},
			set CH(val) {
				self.S.setUint8(5, val);
			},
			get CX() {
				return self.S.getUint16(4, true);
			},
			set CX(val) {
				self.S.setUint16(4, val, true);
			},
			get DL() {
				return self.S.getUint8(6);
			},
			set DL(val) {
				self.S.setUint8(6, val);
			},
			get DH() {
				return self.S.getUint8(7);
			},
			set DH(val) {
				self.S.setUint8(7, val);
			},
			get DX() {
				return self.S.getUint16(6, true);
			},
			set DX(val) {
				self.S.setUint16(6, val, true);
			},
			get CS() {
				return self.S.getUint16(8, true);
			},
			set CS(val) {
				self.S.setUint16(8, val, true);
			},
			get DS() {
				return self.S.getUint16(10, true);
			},
			set DS(val) {
				self.S.setUint16(10, val, true);
			},
			get ES() {
				return self.S.getUint16(12, true);
			},
			set ES(val) {
				self.S.setUint16(12, val, true);
			},
			get SS() {
				return self.S.getUint16(14, true);
			},
			set SS(val) {
				self.S.setUint16(14, val, true);
			},
			get SI() {
				return self.S.getUint16(16, true);
			},
			set SI(val) {
				self.S.setUint16(16, val, true);
			},
			get DI() {
				return self.S.getUint16(18, true);
			},
			set DI(val) {
				self.S.setUint16(18, val, true);
			},
			get BP() {
				return self.S.getUint16(20, true);
			},
			set BP(val) {
				self.S.setUint16(20, val, true);
			},
			get SP() {
				return self.S.getUint16(22, true);
			},
			set SP(val) {
				self.S.setUint16(22, val, true);
			},
			get IP() {
				return self.S.getUint16(24, true);
			},
			set IP(val) {
				self.S.setUint16(24, val, true);
			},
			get F() {
				return self.S.getUint16(26, true);
			},
			set F(val) {
				self.S.setUint16(26, val, true);
			}
		};

		// noinspection JSUndefinedPropertyAssignment
		self.F = {
			INDEX: {
				CF:		0x00, // bit 0: Carry Flag
				BIT1:	0x01, // bit 1: reserved, always set
				PF:		0x02, // bit 2: Parity Flag
				BIT3:	0x03, // bit 3: reserved, always clear
				AF:		0x04, // bit 4: Auxiliary Carry Flag (aka Arithmetic flag)
				BIT5:	0x05, // bit 5: reserved, always clear
				ZF:		0x06, // bit 6: Zero Flag
				SF:		0x07, // bit 7: Sign Flag
				TF:		0x08, // bit 8: Trap Flag
				IF:		0x09, // bit 9: Interrupt Flag
				DF:		0x0A, // bit 10: Direction Flag
				OF:		0x0B, // bit 11: Overflow Flag
				BIT12:	0x0C, // bit 12: reserved, always set
				BIT13:	0x0D, // bit 13: reserved, always set
				BIT14:	0x0E, // bit 14: reserved, always set
				BIT15:	0x0F  // bit 15: reserved, always set
			},
			MASK: {
				CF:		0x0001, // bit 0: Carry Flag
				BIT1:	0x0002, // bit 1: reserved, always set
				PF:		0x0004, // bit 2: Parity Flag
				BIT3:	0x0008, // bit 3: reserved, always clear
				AF:		0x0010, // bit 4: Auxiliary Carry Flag (aka Arithmetic flag)
				BIT5:	0x0020, // bit 5: reserved, always clear
				ZF:		0x0040, // bit 6: Zero Flag
				SF:		0x0080, // bit 7: Sign Flag
				TF:		0x0100, // bit 8: Trap Flag
				IF:		0x0200, // bit 9: Interrupt Flag
				DF:		0x0400, // bit 10: Direction Flag
				OF:		0x0800, // bit 11: Overflow Flag
				BIT12:	0x1000, // bit 12: reserved, always set
				BIT13:	0x2000, // bit 13: reserved, always set
				BIT14:	0x4000, // bit 14: reserved, always set
				BIT15:	0x8000  // bit 15: reserved, always set
			},
			get F() {
				return self.S.getUint16(26, true)
			},
			set F(val) {
				self.S.setUint16(26, val, true);
			},
			get CF() {
				// console.log(S.getUint16(26, true).toString(2).padStart(16, '0'));
				return self.S.getUint16(26, true) & this.MASK.CF;
			},
			set CF(val) {
				console.log(self.S.getUint16(26, true).toString(2).padStart(16, '0'));
				self.S.setUint16(26, val & this.MASK.CF, true);
				console.log(self.S.getUint16(26, true).toString(2).padStart(16, '0'));
			},
			get PF() {
				return self.S.getUint16(26, true) & this.MASK.PF;
			},
			set PF(val) {
				console.log(self.S.getUint16(26, true).toString(2).padStart(16, '0'));
				self.S.setUint16(26, val & this.MASK.PF, true);
				console.log(self.S.getUint16(26, true).toString(2).padStart(16, '0'));
			},
			get AF() {
				return self.S.getUint16(26, true) & this.MASK.AF;
			},
			set AF(val) {
				self.S.setUint16(26, val, true);
			},
			get ZF() {
				return self.S.getUint16(26, true) & this.MASK.ZF;
			},
			set ZF(val) {
				self.S.setUint16(26, val, true);
			},
			get SF() {
				return self.S.getUint16(26, true) & this.MASK.SF;
			},
			set SF(val) {
				self.S.setUint16(26, val, true);
			},
			get TF() {
				return self.S.getUint16(26, true) & this.MASK.TF;
			},
			set TF(val) {
				self.S.setUint16(26, val, true);
			},
			get IF() {
				return self.S.getUint16(26, true) & this.MASK.IF;
			},
			set IF(val) {
				self.S.setUint16(26, val, true);
			},
			get DF() {
				return self.S.getUint16(26, true) & this.MASK.DF;
			},
			set DF(val) {
				self.S.setUint16(26, val, true);
			},
			get OF() {
				return self.S.getUint16(26, true) & this.MASK.OF;
			},
			set OF(val) {
				self.S.setUint16(26, val, true);
			}
		};
	}

	dumpState() {
		console.table([{
			Register: 'AX',
			Value: this.R.AX.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'BX',
			Value: this.R.BX.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'CX',
			Value: this.R.CX.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'DX',
			Value: this.R.DX.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'CS',
			Value: this.R.CS.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'DS',
			Value: this.R.DS.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'ES',
			Value: this.R.ES.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'SS',
			Value: this.R.SS.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'SI',
			Value: this.R.SI.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'DI',
			Value: this.R.DI.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'BP',
			Value: this.R.BP.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'SP',
			Value: this.R.SP.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'IP',
			Value: this.R.IP.toString(16).padStart(4, '0').toUpperCase()
		} , {
			Register: 'Flags',
			Value: this.R.F.toString(16).padStart(4, '0').toUpperCase()
		}]);
	}
}