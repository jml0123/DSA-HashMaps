const HashMap = require('./HashMapNew')
const HashMapSC = require('./HashMapSeparateChaining')


// ??
const removeDuplicates = str => {
    const values = [...str]
    const temp = []
    const hashMap = new HashMap;
    hashMap.MAX_LOAD_RATIO = 0.5
    hashMap.SIZE_RATIO = 2;
    for (let i = 0; i < values.length; i++) {
        let char = values[i]
        if(!(hashMap[char])) {
            hashMap.set(char, i)
            temp.push(char)
        }
        else continue;
    }
    console.log(hashMap) 
}

// ??
const palindrome = str => {
    const palindromeMap = new HashMap;
    palindromeMap.MAX_LOAD_RATIO = 0.5
    palindromeMap.SIZE_RATIO = 2;
    for (let i = 0; i < str.length; i++) {
        if(!palindromeMap[str[i]]) {
            palindromeMap.set(str[i], 1)
        }
        else if (palindromeMap[str[i]] !== undefined) {
            let currVal = palindromeMap[str[i]].value;
            palindromeMap.set(str[i], currVal++)
        }
    }

    let oddCount = 0;
    for(let i = 0; i < str.length; i++) {
        let charCount = palindromeMap.get(str[i])
        if(charCount % 2 === 1){
            oddCount ++
        }
    }
    console.log(palindromeMap)

    if(oddCount> 1 && palindromeMap.length > 1) {
        return false
    }
    return true
}

const groupAnagrams = (listOfStr) => {
    const anagramMap = new HashMap
    anagramMap.MAX_LOAD_RATIO = 0.5
    anagramMap.SIZE_RATIO = 3;

    for (word of listOfStr) {
        let chars = [...word]
        sortedWord = chars.sort().toString()

        if (!(sortedWord in anagramMap)) {
            anagramMap[sortedWord] = []
        }
        anagramMap[sortedWord].push(word)
    }
    return anagramMap
}
const main = () => {
    const lotr = new HashMapSC
    lotr.MAX_LOAD_RATIO = 0.5
    lotr.SIZE_RATIO = 3;
    //console.log(lotr)
    lotr.set("Hobbit", "Bilbo")
    lotr.set("Hobbit", "Frodo")
    lotr.set("Wizard", "Gandalf")
    lotr.set("Human", "Aragorn")
    lotr.set("Elf", "Legolas")
    lotr.set("Maiar", "The Necromancer")
    lotr.set("Maiar", "Sauron")
    lotr.set("RingBearer", "Gollum")
    lotr.set("LadyOfLight", "Galadriel")
    lotr.set("HalfElven", "Arwen")
    lotr.set("Ent", "Treebeard")
    console.log(lotr)
    // Our last set is logged as "undefined" because it surpassed our Hashmap's capacity
    // We are missing the value for Hobbit: Bilbo, and Maiar: The Necromancer
    //console.log(lotr.get("Maiar")) // We are missing The Necromancer because we overwrote the Maiair key with "Sauron" (set it after Bilbo)
    //console.log(lotr.get("Hobbit"))// We are missing Bilbo because we overwrote the Hobbit key with "Frodo" (set it after Bilbo)
    // The capacity for the hash table is now at 24 because our map has been resized
    // loadratio = (9 + 0 + 1 / 8 = 1.25) > 0.5 (MAX_LOAD_RATIO) which triggered a resize by a factor of 3 (SIZE_RATIO)
    //WhatDoesThisDo()
    //removeDuplicates("google")

    //console.log(palindrome("daad"));
    //console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
}

main()

// WHAT DOES THIS DO?

/*
The code below sets two strings and creates a set of hashmaps which adds both strings as keys
The two strings are identical and both Hashmaps use the same algorithm
In hashmap 1, we set str 1 "Hello World" as 10
and then Str 2 "Hello world" as 20. The saved hash value for hello world in map 1 is now 20.

In hashmap 2, we set str 3 hello world as 20, aand str 5 hello world as 10, which makes the "Hello world" key 10

Upon console logging, we will have different values for the key for map 1 and 2.
*/
const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}




// Remove Duplicates
// Palindrome