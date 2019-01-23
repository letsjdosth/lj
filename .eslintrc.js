module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off", //eslint:recommended에서는 켜져있음. 실무 목적에서는 콘솔 출력을 하지 않는게 좋음.
        "no-unused-vars": "off" //eslint:recommended에서는 켜져있음.
        //기타: 스트링 따옴표 설정은 삭제함.
    }
};