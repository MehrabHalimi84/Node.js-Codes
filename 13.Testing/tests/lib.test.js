const lib = require('../lib');
const mail = require('../mail');
const db = require('../db');
describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('should return 0 number if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mehrab');
        expect(result).toBe('Welcome Mehrab');// سخت گیر باید حتما همون خروجی باشه تا قبول کنه
        expect(result).toMatch(/Mehrab/)    // میبینه پترنه مهراب رو داره یا نه
        expect(result).toContain('Mehrab'); // میبینه وجود داره یا نه
    });
})

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10 })

        expect(result).toMatchObject({ id: 1, price: 10 });

        expect(result).toHaveProperty('id', 1);
    })
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        })
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Mehrab');
        expect(result).toMatchObject({ username: 'Mehrab' });
        expect(result.id).toBeGreaterThan(0);
    })
})

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = function (customerId) {
            return { email: 'test@example.com' }
        };

        let mailSent = false;
        mail.send = function (email, message) {
            mailSent = true;
        }

        lib.notifyCustomer({ customerId: 1 });

        expect(mailSent).toBe(true);
    });
})

describe('notify', () => {
    it('should send email to the customer', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'test@example.com' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('test@example.com');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/); // مطمعن میشه داخل پیام order داشته باشه
    })
})