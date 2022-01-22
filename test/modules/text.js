const expect = require("../expect");

const types = require("../../lib/types");
const parse = require("../../lib/interpreter");
const text = require("../../lib/modules/text")(types);

const evaluate = async (expression, presets={}) => {
    const context = Object.assign({text}, presets);
    return await parse(expression)(context);
}



describe("text module", () => {

    describe("f = text.find s1", () => {
        
        describe("when s1 is an item", () => {
            
            it("should return a function", async () => {
                expect(await evaluate("text.find 'Abc'")).to.be.instanceof(types.Func);
            });

            describe("i = f s2 ", () => {
    
                it("should return the first index of s1 in s2", async () => {
                    expect(await evaluate("text.find 'Abc' '__Abc__def__Abc'")).to.be.Numb(2);
                });
    
                it("should return -1 if no match is found", async () => {
                    expect(await evaluate("text.find 'xxx' '__Abc__def__Abc'")).to.be.Numb(-1);
                });
    
                it("should return Undefined Number if `s1` is not a string", async () => {
                    expect(await evaluate("text.find 10")).to.be.instanceof(types.Func);
                    expect(await evaluate("text.find 10 'abc'")).to.be.Undefined("Number");
                });

                it("should return Undefined Number if `s2` is not a string", async () => {
                    expect(await evaluate("text.find 'abc' 10")).to.be.Undefined("Number");
                });

                it("should apply only to the first item if the parameter is a tuple", async () => {
                    expect(await evaluate("text.find 'Abc' ('__Abc__def__Abc', '01234Abc__')")).to.be.Numb(2);
                });
            });
        });

        describe("when the argument is a tuple", () => {
            
            it("should apply only to the first item", async () => {
                expect(await evaluate("text.find('Abc','Def')")).to.be.instanceof(types.Func);
                expect(await evaluate("text.find('Abc','Def') '__Abc__def__Def'")).to.be.Numb(2);
                expect(await evaluate("text.find('Abc','Def')('__Abc__Def__Abc', '01234Abc__')")).to.be.Numb(2);                    
            });
        });    
    });    

    describe("f = text.rfind s1", () => {
        
        describe("when s1 is an item", () => {
            
            it("should return a function", async () => {
                expect(await evaluate("text.rfind 'Abc'")).to.be.instanceof(types.Func);
            });

            describe("i = f s2 ", () => {
    
                it("should return the last index of s1 in s2", async () => {
                    expect(await evaluate("text.rfind 'Abc' '__Abc__def__Abc'")).to.be.Numb(12);
                });
    
                it("should return -1 if no match is found", async () => {
                    expect(await evaluate("text.rfind 'xxx' '__Abc__def__Abc'")).to.be.Numb(-1);
                });
    
                it("should return Undefined Number if `s1` is not a string", async () => {
                    expect(await evaluate("text.rfind 10")).to.be.instanceof(types.Func);
                    expect(await evaluate("text.rfind 10 'abc'")).to.be.Undefined("Number");
                });

                it("should return Undefined Number if `s2` is not a string", async () => {
                    expect(await evaluate("text.rfind 'abc' 10")).to.be.Undefined("Number");
                });

                it("should apply only to the first item if the parameter is a tuple", async () => {
                    expect(await evaluate("text.rfind 'Abc' ('__Abc__def__Abc', '01234Abc__')")).to.be.Numb(12);
                });
            });
        });

        describe("when the argument is a tuple", () => {
            
            it("should apply only to the first item", async () => {
                expect(await evaluate("text.rfind('Abc','Def')")).to.be.instanceof(types.Func);
                expect(await evaluate("text.rfind('Abc','Def') '__Abc__Def__Abc'")).to.be.Numb(12);
                expect(await evaluate("text.rfind('Abc','Def')('__Abc__Def__Abc', '01234Abc__')")).to.be.Numb(12);
            });
        });    
    });    

    describe("text.lower - function", () => {

        it("should return the given string converted to lower case characters", async () => {
            expect(await evaluate("text.lower 'AbcDef'")).to.be.Text("abcdef");
        });
        
        it("should return Undefined Text if the argument is not a string", async () => {
            expect(await evaluate("text.lower 123")).to.be.Undefined("Text");
        });

        it("should apply to the first items only, if the argument is a truple", async () => {
            expect(await evaluate("text.lower('ABC','Def')")).to.be.Text("abc");
        });                        
    });    

    describe("text.upper - function", () => {

        it("should return the given string converted to lower case characters", async () => {
            expect(await evaluate("text.upper 'AbcDef'")).to.be.Text("ABCDEF");
        });
        
        it("should return Undefined Text if the argument is not a string", async () => {
            expect(await evaluate("text.upper 123")).to.be.Undefined("Text");
        });

        it("should apply to the first items only, if the argument is a truple", async () => {
            expect(await evaluate("text.upper('abc','Def')")).to.be.Text("ABC");
        });                        
    });    

    describe("s2 = text.trim_head s1", () => {
        
        it("should return `s1` without leading spaces", async () => {
            expect(await evaluate("text.trim_head '   abc   '")).to.be.Text("abc   ");
        });
        
        it("should return Undefined Text if the argument is not a string", async () => {
            expect(await evaluate("text.trim_head 123")).to.be.Undefined("Text");
        });

        it("should apply to the first items only, if the argument is a truple", async () => {
            expect(await evaluate("text.trim_head(' abc ',' Def ')")).to.be.Text("abc ");
        });                        
    });   

    describe("s2 = text.trim_tail s1", () => {
        
        it("should return `s1` without trailing spaces", async () => {
            expect(await evaluate("text.trim_tail '   abc   '")).to.be.Text("   abc");
        });
        
        it("should return Undefined Text if the argument is not a string", async () => {
            expect(await evaluate("text.trim_tail 123")).to.be.Undefined("Text");
        });

        it("should apply to the first items only, if the argument is a truple", async () => {
            expect(await evaluate("text.trim_tail(' abc ',' Def ')")).to.be.Text(" abc");
        });                        
    });   

    describe("s2 = text.trim s1", () => {
        
        it("should return `s1` without leading and trailing spaces", async () => {
            expect(await evaluate("text.trim '   abc   '")).to.be.Text("abc");
        });
        
        it("should return Undefined Text if the argument is not a string", async () => {
            expect(await evaluate("text.trim 123")).to.be.Undefined("Text");
        });

        it("should apply to the first items only, if the argument is a truple", async () => {
            expect(await evaluate("text.trim(' abc ',' Def ')")).to.be.Text("abc");
        });                        
    });   

    describe("f = text.head n", () => {

        describe("when n is an item", () => {
            
            it("should return a function", async () => {
                expect(await evaluate("text.head 3")).to.be.instanceof(types.Func);
            });

            describe("s2 = f s1 ", () => {
    
                it("should return the first n characters of s1", async () => {
                    expect(await evaluate("text.head 3 'abcdef'")).to.be.Text('abc');
                });
    
                it("should consider n relative to the end of the string if it is negative", async () => {
                    expect(await evaluate("text.head (-2) 'abcdef'")).to.be.Text('abcd');
                });

                it("should return Undefined Text if `n` is not a number", async () => {
                    expect(await evaluate("text.head 'abc'")).to.be.instanceof(types.Func);
                    expect(await evaluate("text.head 'abc' 'def'")).to.be.Undefined("Text");
                });

                it("should return Undefined Text if `s1` is not a string", async () => {
                    expect(await evaluate("text.head 3 10")).to.be.Undefined("Text");
                });

                it("should apply only to the first item if the parameter is a tuple", async () => {
                    expect(await evaluate("text.head 2 ('abc', 'def', 'ghi')")).to.be.Text('ab');
                });
            });
        });

        describe("when the argument is a tuple", () => {
            
            it("should apply only to the first item", async () => {
                expect(await evaluate("text.head(2,3)")).to.be.instanceof(types.Func);
                expect(await evaluate("text.head(2,3) 'abcdef'")).to.be.Text('ab');
                expect(await evaluate("text.head(2,3)('abcdef', 'ghijkl')")).to.be.Text('ab');                    
            });
        });    
    });              

    describe("f = text.tail n", () => {

        describe("when n is an item", () => {
            
            it("should return a function", async () => {
                expect(await evaluate("text.tail 3")).to.be.instanceof(types.Func);
            });

            describe("s2 = f s1 ", () => {
    
                it("should return the last characters of s1, starting with the n-th", async () => {
                    expect(await evaluate("text.tail 2 'abcdef'")).to.be.Text('cdef');
                });
    
                it("should consider n relative to the end of the string if it is negative", async () => {
                    expect(await evaluate("text.tail (-2) 'abcdef'")).to.be.Text('ef');
                });

                it("should return Undefined Text if `n` is not a number", async () => {
                    expect(await evaluate("text.tail 'abc'")).to.be.instanceof(types.Func);
                    expect(await evaluate("text.tail 'abc' 'def'")).to.be.Undefined("Text");
                });

                it("should return Undefined Text if `s1` is not a string", async () => {
                    expect(await evaluate("text.tail 3 10")).to.be.Undefined("Text");
                });

                it("should apply only to the first item if the parameter is a tuple", async () => {
                    expect(await evaluate("text.tail (-2) ('abc', 'def', 'ghi')")).to.be.Text('bc');
                });
            });
        });

        describe("when the argument is a tuple", () => {
            
            it("should apply only to the first item", async () => {
                expect(await evaluate("text.tail(2,3)")).to.be.instanceof(types.Func);
                expect(await evaluate("text.tail(-2,-3) 'abcdef'")).to.be.Text('ef');
                expect(await evaluate("text.tail(-2,-3)('abcdef', 'ghijkl')")).to.be.Text('ef');                    
            });
        });    
    });              

    describe("f = text.split s1", () => {

        describe("when s1 is an item", () => {
            
            it("should return a function", async () => {
                expect(await evaluate("text.split '::'")).to.be.instanceof(types.Func);
            });

            describe("l = f s2 ", () => {
    
                it("should return the list of the s2 substrings separated by s1", async () => {
                    expect(await evaluate("text.split '::' 'ab::cd::ef'")).to.be.List(["ab","cd","ef"]);
                    expect(await evaluate("text.split '::' 'abcdef'")).to.be.List(["abcdef"]);
                });

                it("should return Undefined Text if `s1` is not a string", async () => {
                    expect(await evaluate("text.split 10")).to.be.instanceof(types.Func);
                    expect(await evaluate("text.split 10 'def'")).to.be.Undefined("Text");
                });

                it("should return Undefined Text if `s2` is not a string", async () => {
                    expect(await evaluate("text.split '::' 10")).to.be.Undefined("Text");
                });

                it("should apply only to the first item if the parameter is a tuple", async () => {
                    expect(await evaluate("text.split '::' ('ab::cd', 'de::fg')")).to.be.List(["ab","cd"]);
                });
            });
        });

        describe("when s1 is a tuple", () => {
            
            it("should apply only to the first item", async () => {
                expect(await evaluate("text.split('::','!!')")).to.be.instanceof(types.Func);
                expect(await evaluate("text.split('::','!!') 'a!!b::c!!d'")).to.be.List(["a!!b","c!!d"]);
                expect(await evaluate("text.split('::','!!')('ab::cd!!ef', 'gh::ij!!kl')")).to.be.List(["ab","cd!!ef"]);
            });
        });    
    });              
});
