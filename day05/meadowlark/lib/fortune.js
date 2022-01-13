var fortuneCookies = [
    'Conquer your fears or they will conquer you.',
    'Rivers need springs.',
    'Do not fear what you dont know.',
    'You will have a pleasant surprise.',
    'Wheneve possible, keep it simple'
];

exports.getFortune = function () {
    var ids = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[ids]
}