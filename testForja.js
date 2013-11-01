/* global console, forjaApp, describe, beforeEach, it,expect */
'use strict';
(function (window){
	describe('Baby care App - ',function(){
		beforeEach(function(){
			forjaApp.sleepMinutes = 0;
		});

		describe('Baby Care Part -',function(){
			describe('input === "Bua"',function(){
				it('should attendBaby return "Alimentar"',function(){
					expect(forjaApp.attendBaby('Bua')).toBe('Alimentar');
				});
				it('should attendBaby substract 60 minutes of sleep ',function(){
					forjaApp.attendBaby('Bua');
					expect(forjaApp.sleepMinutes).toBe(-60);
				});
			});

			describe('input === "Mua"',function(){
				it('should attendBaby return "Pañal"',function(){
					expect(forjaApp.attendBaby('Mua')).toBe('Pañal');
				});
				it('should attendBaby substract 30 minutes of sleep ',function(){
					forjaApp.attendBaby('Mua');
					expect(forjaApp.sleepMinutes).toBe(-30);
				});
			});

			describe('input === "Gua"',function(){
				it('should attendBaby return "Chupete"',function(){
					expect(forjaApp.attendBaby('Gua')).toBe('Chupete');
				});
				it('should attendBaby substract 10 minutes of sleep ',function(){
					forjaApp.attendBaby('Gua');
					expect(forjaApp.sleepMinutes).toBe(-10);
				});
			});

			describe('We need a property to store the previous input state',function(){
				it('should previousInput to be "Mua" when we call attendBaby with "Mua" Input',function(){
					expect(forjaApp.attendBaby('Mua')).toBe('Pañal');
					expect(forjaApp.previousInput).toBe('Mua');
				});
			});

			describe('(Mua-Bua) - input === "Mua" and then input === "Bua"',function(){
				it('should attendBaby called twice with this two inputs substract 75 minutes of sleep ',function(){
					forjaApp.attendBaby('Mua');
					forjaApp.attendBaby('Bua');
					expect(forjaApp.sleepMinutes).toBe(-75);
				});

			});

			describe('(Bua-Gua) - input === "Bua" and then input === "Gua"',function(){
				it('should attendBaby called twice with this two inputs substract 65 minutes of sleep ',function(){
					forjaApp.attendBaby('Bua');
					forjaApp.attendBaby('Gua');
					expect(forjaApp.sleepMinutes).toBe(-65);
				});
			});

			describe('We need a property to store the previous of the previous input state',function(){
				it('should previousInput to be "Mua" and the prevPrevInput to be',function(){
					forjaApp.attendBaby('Mua');
					forjaApp.attendBaby('Gua');
					expect(forjaApp.prevPrevInput).toBe('Mua');

				});
			});

			describe('(Mua-Bua-Gua) - input === "Mua" and then input === "Bua" and then input === "Gua"',function(){
				it('should attendBaby called with this three different inputs substract -75 minutes of sleep ',function(){
					forjaApp.attendBaby('Mua');
					forjaApp.attendBaby('Bua');
					forjaApp.attendBaby('Gua');
					expect(forjaApp.sleepMinutes).toBe(-75);
				});
			});
		});

		describe('Followers Part -',function(){
			describe('We have 4 or more sleep hours - ',function(){
				it('should not loose any Followers!',function(){
					forjaApp.sleepMinutes = 4 * 60;
					expect(forjaApp.calculateLostFollowers()).toBe(0);
					forjaApp.sleepMinutes = 8 * 60;
					expect(forjaApp.calculateLostFollowers()).toBe(0);
				});
			});
			describe('We have less than 4 sleep hours - ',function(){
				describe('Slept 1 to 30 less minutes - ',function(){
					it('should loose 100 followers',function(){
						forjaApp.sleepMinutes = (4 * 60) - 30;
						expect(forjaApp.calculateLostFollowers()).toBe(100);
						forjaApp.sleepMinutes = (4 * 60) - 1;
						expect(forjaApp.calculateLostFollowers()).toBe(100);
					});
				});
				describe('Slept 2 to 3.5 hours - ',function(){
					it('should loose 100 followers every 30 minutes',function(){
						forjaApp.sleepMinutes = (4 * 60) - 60;
						expect(forjaApp.calculateLostFollowers()).toBe(200);
						forjaApp.sleepMinutes = (4 * 60) - 90;
						expect(forjaApp.calculateLostFollowers()).toBe(300);
						forjaApp.sleepMinutes = (4 * 60) - 120;
						expect(forjaApp.calculateLostFollowers()).toBe(400);
					});
				});
				describe('Slept 0 to 2 hours - already lost 400 followers ',function(){
					it('should loose 200 followers every 30 minutes',function(){
						forjaApp.sleepMinutes = (2 * 60) - 30;
						expect(forjaApp.calculateLostFollowers()).toBe(600);
						forjaApp.sleepMinutes = (2 * 60) - 60;
						expect(forjaApp.calculateLostFollowers()).toBe(800);
						forjaApp.sleepMinutes = (2 * 60) - 90;
						expect(forjaApp.calculateLostFollowers()).toBe(1000);
						forjaApp.sleepMinutes = (2 * 60) - 120;
						expect(forjaApp.calculateLostFollowers()).toBe(1200);
					});
				});
			});
		});
	});
}
)(window);