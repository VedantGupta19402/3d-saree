// AARNA — Atelier Shopping Bag Drawer
// Working persistent cart with quantity adjustments, subtotal, and bespoke order transition.

import { useCloset } from '../store/useCloset'
import { formatPrice, formatInr } from '../data/garments'

export default function AarnaBagDrawer() {
  const isBagOpen = useCloset((s) => s.isBagOpen)
  const toggleBag = useCloset((s) => s.toggleBag)
  const toggleEnquiry = useCloset((s) => s.toggleEnquiry)
  const bag = useCloset((s) => s.bag)
  const updateQuantity = useCloset((s) => s.updateQuantity)
  const removeFromBag = useCloset((s) => s.removeFromBag)
  const clearBag = useCloset((s) => s.clearBag)
  const currency = useCloset((s) => s.currency)

  const subtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0)

  if (!isBagOpen) return null

  return (
    <div className="bag-modal" role="dialog" aria-modal="true" aria-label="Atelier Shopping Bag">
      {/* Backdrop */}
      <div className="bag-modal__backdrop" onClick={() => toggleBag(false)} />

      {/* Slide-in Drawer */}
      <div className="bag-drawer" data-lenis-prevent>
        {/* Header */}
        <div className="bag-drawer__header">
          <div className="bag-drawer__title-wrap">
            <h3 className="bag-drawer__title">Atelier Bag</h3>
            <span className="bag-drawer__count">{totalItems} creations</span>
          </div>
          <button
            className="bag-drawer__close"
            onClick={() => toggleBag(false)}
            aria-label="Close bag drawer"
          >
            ✕
          </button>
        </div>

        {/* Cart Item List */}
        <div className="bag-drawer__body">
          {bag.length === 0 ? (
            <div className="bag-empty">
              <span className="bag-empty__icon">✦</span>
              <p className="bag-empty__text">Your Atelier Bag is currently empty.</p>
              <p className="bag-empty__sub">
                Explore our spatial collection and pull a handcrafted creation to inspect it.
              </p>
              <button
                className="btn btn--solid"
                onClick={() => toggleBag(false)}
              >
                Explore the Gallery
              </button>
            </div>
          ) : (
            <div className="bag-items">
              {bag.map((item) => (
                <div key={item.cartItemId} className="bag-item">
                  <div
                    className="bag-item__color-preview"
                    style={{ background: item.colorHex || '#F4F0E8' }}
                  />

                  <div className="bag-item__info">
                    <h4 className="bag-item__name">{item.name}</h4>
                    <span className="bag-item__meta">
                      {item.color} · Size: {item.size}
                    </span>
                    <span className="bag-item__price">
                      {currency === 'USD' ? formatPrice(item.price) : formatInr(item.price)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="bag-item__actions">
                    <div className="qty-stepper">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="bag-item__remove"
                      onClick={() => removeFromBag(item.cartItemId)}
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {bag.length > 0 && (
          <div className="bag-drawer__footer">
            <div className="bag-summary">
              <div className="bag-summary__row">
                <span>Atelier Subtotal</span>
                <span>{currency === 'USD' ? formatPrice(subtotal) : formatInr(subtotal)}</span>
              </div>
              <div className="bag-summary__row bag-summary__shipping">
                <span>Insured International Courier</span>
                <span className="bag-complimentary">Complimentary</span>
              </div>
              <div className="bag-summary__row bag-summary__total">
                <span>Estimated Total</span>
                <span className="bag-total-val">
                  {currency === 'USD' ? formatPrice(subtotal) : formatInr(subtotal)}
                </span>
              </div>
            </div>

            <div className="bag-drawer__cta-block">
              <button
                className="btn btn--solid btn--wide"
                onClick={() => {
                  toggleBag(false)
                  toggleEnquiry(true)
                }}
              >
                Schedule Bespoke Order & Consultation
              </button>
              <button
                className="btn btn--text btn--wide"
                onClick={clearBag}
              >
                Clear Entire Bag
              </button>
            </div>

            <p className="bag-drawer__guarantee">
              All creations are individually tailored and shipped in climate-regulated archival cases.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

