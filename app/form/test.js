const items = [
  {id: 1, stock: 10},
  {id: 2, stock: 20},
  {id: 3, stock: 30},
  {id: 4, stock: 40},
  {id: 5, stock: 50},
  {id: 1, stock: 100},
]

const filtered = items.filter((item) => {
  return item.id === 2
})

console.log(filtered)