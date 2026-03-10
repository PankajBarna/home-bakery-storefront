import { createContext, useMemo, useState } from 'react'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item) => {
    const id = `${item.productId}-${item.weight}-${item.flavour}-${item.eggType}`

    setCartItems((prev) => {
      const existing = prev.find((x) => x.cartKey === id)

      if (existing) {
        return prev.map((x) =>
          x.cartKey === id ? { ...x, quantity: x.quantity + item.quantity } : x
        )
      }

      return [...prev, { ...item, cartKey: id }]
    })

    setIsCartOpen(true)
  }

  const updateCartItem = (cartKey, updates) => {
    setCartItems((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, ...updates } : item))
    )
  }

  const removeCartItem = (cartKey) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey))
  }

  const clearCart = () => setCartItems([])

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartItems])

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        total,
        cartCount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}