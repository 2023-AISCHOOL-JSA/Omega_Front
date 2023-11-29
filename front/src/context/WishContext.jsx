import React, { createContext, useState } from 'react'

export const WishContext = createContext()

export const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([])

  const addWish = (item) => {
    setWish([...wish, item])
  }

  const removeWish = (item) => {
    setWish(wish.filter((wish) => wish.id !== item.id))
  }

  return (
    <WishContext.Provider value={{ wish, addWish, removeWish }}>
      {children}
    </WishContext.Provider>
  )
}
