const aa = `charset|clear|connect|edit|ego|exit|go|help|nopager|notee|nowarning|pager|print|prompt|quit|rehash|source|status|system|tee`
var arr = aa.split(',')
var arr1 = []
 for (let i = 0; i < arr.length; i++) {
     const element = arr[i];
     element.toLocaleUpperCase()
     arr1.push(element.toLocaleUpperCase())
}
var str =  arr1.join('|')
console.log(str)
