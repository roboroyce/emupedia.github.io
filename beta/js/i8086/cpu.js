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

To get a bit mask:

var mask = 1 << 5; // gets the 6th bit

To test if a bit is set:

if ((n & mask) != 0) {
  // bit is set
} else {
  // bit is not set
}

To set a bit:

n |= mask;

To clear a bit:

n &= ~mask;

To toggle a bit:

n ^= mask;

*/

// noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {
	'use strict';

	function CPU() {
		console.log('CPU i8086 initialised!');

		var self = this;

		// noinspection JSUndefinedPropertyAssignment
		self.B = new ArrayBuffer(28 + 1024 * 1024); // 28 bytes for registers + 1048576 bytes for ram

		// noinspection JSUndefinedPropertyAssignment
		self.U8 = new Uint8Array(self.B);

		// noinspection JSUndefinedPropertyAssignment
		self.U16 = new Uint16Array(self.B);

		// noinspection JSUndefinedPropertyAssignment
		self.U32 = new Uint32Array(self.B);

		// noinspection JSUndefinedPropertyAssignment
		self.S = new DataView(self.B.slice(0, 28));

		self.RAM = new DataView(self.B.slice(28));

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
		self.R8 = {
			INDEX: {
			AL: 0x00,
			AH: 0x01,
			BL: 0x02,
			BH: 0x03,
			CL: 0x04,
			CH: 0x05,
			DL: 0x06,
			DH: 0x07
		},
			get AL() {
				return self.U8[0];
			},
			set AL(val) {
				self.U8[0] = val;
			},
			get AH() {
				return self.U8[1];
			},
			set AH(val) {
				self.U8[1] = val;
			},
			get BL() {
				return self.U8[2];
			},
			set BL(val) {
				self.U8[2] = val;
			},
			get BH() {
				return self.U8[3];
			},
			set BH(val) {
				self.U8[3] = val;
			},
			get CL() {
				return self.U8[4];
			},
			set CL(val) {
				self.U8[4] = val;
			},
			get CH() {
				return self.U8[5];
			},
			set CH(val) {
				self.U8[5] = val;
			},
			get DL() {
				return self.U8[6];
			},
			set DL(val) {
				self.U8[6] = val;
			},
			get DH() {
				return self.U8[7];
			},
			set DH(val) {
				self.U8[7] = val;
			}
		};

		// noinspection JSUndefinedPropertyAssignment
		self.R16 = {
			INDEX: {
				AX: 0x00,
				BX: 0x01,
				CX: 0x02,
				DX: 0x03,
				AF: 0x04,
				CS: 0x05,
				DS: 0x06,
				ES: 0x07,
				SS: 0x08,
				SI: 0x09,
				DI: 0x0A,
				BP: 0x0B,
				SP: 0x0C,
				IP: 0x0D,
				F:	0x0E
			},
			get AX() {
				return self.U16[0];
			},
			set AX(val) {
				self.U16[0] = val;
			},
			get BX() {
				return self.U16[1];
			},
			set BX(val) {
				self.U16[1] = val;
			},
			get CX() {
				return self.U16[2];
			},
			set CX(val) {
				self.U16[2] = val;
			},
			get DX() {
				return self.U16[3];
			},
			set DX(val) {
				self.U16[3] = val;
			},
			get CS() {
				return self.U16[4];
			},
			set CS(val) {
				self.U16[4] = val;
			},
			get DS() {
				return self.U16[5];
			},
			set DS(val) {
				self.U16[5] = val;
			},
			get ES() {
				return self.U16[6];
			},
			set ES(val) {
				self.U16[6] = val;
			},
			get SS() {
				return self.U16[7];
			},
			set SS(val) {
				self.U16[7] = val;
			},
			get SI() {
				return self.U16[8];
			},
			set SI(val) {
				self.U16[8] = val;
			},
			get DI() {
				return self.U16[9];
			},
			set DI(val) {
				self.U16[9] = val;
			},
			get BP() {
				return self.U16[10];
			},
			set BP(val) {
				self.U16[10] = val;
			},
			get SP() {
				return self.U16[11];
			},
			set SP(val) {
				self.U16[11] = val;
			},
			get IP() {
				return self.U16[12];
			},
			set IP(val) {
				self.U16[12] = val;
			},
			get F() {
				return self.U16[13];
			},
			set F(val) {
				self.U16[13] = val;
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
				CF:		0x0001,
				BIT1:	0x0002,
				PF:		0x0004,
				BIT3:	0x0008,
				AF:		0x0010,
				BIT5:	0x0020,
				ZF:		0x0040,
				SF:		0x0080,
				TF:		0x0100,
				IF:		0x0200,
				DF:		0x0400,
				OF:		0x0800,
				BIT12:	0x1000,
				BIT13:	0x2000,
				BIT14:	0x4000,
				BIT15:	0x8000
			},
			get F() {
				return self.S.getUint16(26, true)
			},
			set F(val) {
				self.S.setUint16(26, val, true);
			},
			get CF() {
				return (self.S.getUint16(26, true) & this.MASK.CF) >>> this.INDEX.CF;
			},
			set CF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.CF) : (this.F & ~this.MASK.CF), true);
			},
			get BIT1() {
				return (self.S.getUint16(26, true) & this.MASK.BIT1) >>> this.INDEX.BIT1;
			},
			set BIT1(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.BIT1) : (this.F & ~this.MASK.BIT1), true);
			},
			get PF() {
				return (self.S.getUint16(26, true) & this.MASK.PF) >>> this.INDEX.PF;
			},
			set PF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.PF) : (this.F & ~this.MASK.PF), true);
			},
			get BIT3() {
				return (self.S.getUint16(26, true) & this.MASK.BIT3) >>> this.INDEX.BIT3;
			},
			set BIT3(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.BIT3) : (this.F & ~this.MASK.BIT3), true);
			},
			get AF() {
				return (self.S.getUint16(26, true) & this.MASK.AF) >>> this.INDEX.AF;
			},
			set AF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.AF) : (this.F & ~this.MASK.AF), true);
			},
			get BIT5() {
				return (self.S.getUint16(26, true) & this.MASK.BIT5) >>> this.INDEX.BIT5;
			},
			set BIT5(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.BIT5) : (this.F & ~this.MASK.BIT5), true);
			},
			get ZF() {
				return (self.S.getUint16(26, true) & this.MASK.ZF) >>> this.INDEX.ZF;
			},
			set ZF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.ZF) : (this.F & ~this.MASK.ZF), true);
			},
			get SF() {
				return (self.S.getUint16(26, true) & this.MASK.SF) >>> this.INDEX.SF;
			},
			set SF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.SF) : (this.F & ~this.MASK.SF), true);
			},
			get TF() {
				return (self.S.getUint16(26, true) & this.MASK.TF) >>> this.INDEX.TF;
			},
			set TF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.TF) : (this.F & ~this.MASK.TF), true);
			},
			get IF() {
				return (self.S.getUint16(26, true) & this.MASK.IF) >>> this.INDEX.IF;
			},
			set IF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.IF) : (this.F & ~this.MASK.IF), true);
			},
			get DF() {
				return (self.S.getUint16(26, true) & this.MASK.DF) >>> this.INDEX.DF;
			},
			set DF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.DF) : (this.F & ~this.MASK.DF), true);
			},
			get OF() {
				return (self.S.getUint16(26, true) & this.MASK.OF) >>> this.INDEX.OF;
			},
			set OF(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.OF) : (this.F & ~this.MASK.OF), true);
			},
			get BIT12() {
				return (self.S.getUint16(26, true) & this.MASK.BIT12) >>> this.INDEX.BIT12;
			},
			set BIT12(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.BIT12) : (this.F & ~this.MASK.BIT12), true);
			},
			get BIT13() {
				return (self.S.getUint16(26, true) & this.MASK.BIT13) >>> this.INDEX.BIT13;
			},
			set BIT13(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.BIT13) : (this.F & ~this.MASK.BIT13), true);
			},
			get BIT14() {
				return (self.S.getUint16(26, true) & this.MASK.BIT14) >>> this.INDEX.BIT14;
			},
			set BIT14(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.BIT14) : (this.F & ~this.MASK.BIT14), true);
			},
			get BIT15() {
				return (self.S.getUint16(26, true) & this.MASK.BIT15) >>> this.INDEX.BIT15;
			},
			set BIT15(val) {
				self.S.setUint16(26, val ? (this.F | this.MASK.BIT15) : (this.F & ~this.MASK.BIT15), true);
			}
		};
	}

	CPU.prototype.dumpState = function() {
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
	};

	CPU.prototype.start = function () {
		var self = this;

		self.R.F = 0xF002; // starting value for flags
	};

	if (typeof global.CPU === 'undefined') {
		global.CPU = CPU;
	}

})(this);