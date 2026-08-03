import { Component } from '@theme/component';

const STORAGE_KEY = 'claventory:wishlist';

function readWishlist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function writeWishlist(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

/**
 * A heart-icon button that toggles a product in/out of a client-side
 * wishlist stored in localStorage. No backend/account required.
 *
 * @extends {Component}
 */
export class WishlistButtonComponent extends Component {
  connectedCallback() {
    super.connectedCallback();
    this.#render();
  }

  toggle() {
    const id = this.dataset.productId;
    if (!id) return;

    const ids = readWishlist();
    const index = ids.indexOf(id);

    if (index === -1) {
      ids.push(id);
    } else {
      ids.splice(index, 1);
    }

    writeWishlist(ids);
    this.#render();
  }

  #render() {
    const id = this.dataset.productId;
    const isLiked = id ? readWishlist().includes(id) : false;
    this.toggleAttribute('data-liked', isLiked);
    this.setAttribute('aria-pressed', String(isLiked));
  }
}

if (!customElements.get('wishlist-button-component')) {
  customElements.define('wishlist-button-component', WishlistButtonComponent);
}
