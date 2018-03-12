import { Player } from '../player';
import { Round } from '../round';

describe('Class', () => {
  describe('Round', () => {
    const player = new Player('test');

    describe('constructor', () => {
      it('should set winner to null', () => {
        expect((new Round(player)).winner).toBe(null);
      });
      it('should set player to first argument', () => {
        expect((new Round(player)).player).toBe(player);
      });
      it('should set bets to an empty object', () => {
        const bets = (new Round(player)).bets;
        expect(bets).toBeDefined();
        expect(bets instanceof Object).toBeTruthy();
      });
    });

    describe('removePosition()', () => {
      it('should delete key from bets', () => {
        const round = new Round(player);
        const amount = 10;
        const positionId = 'foo';
        round.bets = {[positionId]: amount};
        round.removePosition(positionId);
        expect(round.bets[positionId]).not.toBeDefined();
      });
      it('should delete key from bets', () => {
        const round = new Round(player);
        const amount = 10;
        const positionId = 'foo';
        round.player.returnBet = jest.fn();
        round.bets = {[positionId]: amount};
        round.removePosition(positionId);
        expect(round.player.returnBet).toHaveBeenCalledWith(amount);
      });
    });

    describe('placeBet()', () => {
      it('should throw error if amount is greater than players bank', () => {
        const positionId = 'foo';
        const amount = 10;
        const round = new Round(player);
        const action = () => round.placeBet(amount, positionId);

        round.player.bank = 0;
        expect(action).toThrowError(Round.ERROR_NO_FUNDS);
      });
      it('should insert key into bets object with amount as value', () => {
        const positionId = 'foo';
        const amount = 10;
        const round = new Round(player);

        round.bets = {}; // hard reset bets
        round.player.bank = amount; // ensure player has enough credit
        round.placeBet(amount, positionId);
        expect(round.bets[positionId]).toBe(amount);
      });
      it('should update bets value if already exists', () => {
        const positionId = 'foo';
        const amount = 10;
        const round = new Round(player);

        round.bets = {[positionId]: amount}; // set foo: 10
        round.player.bank = amount; // ensure player has enough credit
        round.placeBet(amount, positionId); // bet another 10 credits
        expect(round.bets[positionId]).toBe(amount + amount);
      });
      it('should update bets value if already exists', () => {
        const positionId = 'foo';
        const amount = 10;
        const round = new Round(player);

        round.player.bank = amount; // ensure player has enough credit
        round.player.bet = jest.fn();
        round.placeBet(amount, positionId); // bet another 10 credits
        expect(round.player.bet).toHaveBeenCalledWith(amount);
      });
    });
  });
});