import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from "next/dynamic";

import { PublicKey } from '@solana/web3.js';



const Navbar = () => {

  // This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet();

  // Dynamic import `WalletMultiButton` to prevent hydration error
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" />
  
      <div className="button-container">
        <WalletMultiButtonDynamic className="cta-button connect-wallet-button" />
      </div>    
    </div>
  );

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">SolanaKart</Link>
      </p>

      <main>
          {/* We only render the connect button if public key doesn't exist */}
          {publicKey ? 'Connected!' : renderNotConnectedContainer()}

      </main>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar