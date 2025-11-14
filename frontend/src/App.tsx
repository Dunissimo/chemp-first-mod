import { NavLink, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { useBalance } from "./hooks/useBalance";
import { useEffect, useState } from "react";
import type { IGetBalanceReturns } from "./utils/types";
import Balances from "./components/Balances";

function App() {
    const {signer, isAuthLoading, isAuth, connectWallet, disconnectWallet} = useAuth();
    const {balance} = useBalance();

    const [formattedBalance, setFormattedBalance] = useState<IGetBalanceReturns | undefined>(undefined);

    const activeClass = (isActive: boolean) => {
        const baseClass = 'nav-link';

        return isActive ? baseClass + ' nav-link-active' : baseClass;
    }

    const handleClick = () => {
        if (!signer || !isAuth) {
            connectWallet();
        }

        if (signer && isAuth) {
            disconnectWallet();
        }
    }

    useEffect(() => {
        if (isAuth && !signer) {
            connectWallet();
        }
    }, [connectWallet, signer, isAuth]);

    useEffect(() => {
        setFormattedBalance(balance);
    }, [balance]);

    return (
        <div className="app">
            <aside className="aside">
                <ul>
                    <li>
                        <NavLink to={'/'} className={({isActive}) => activeClass(isActive)}>Pools</NavLink>
                    </li>
                    {signer && <li>
                        <NavLink to={'/stacking'} className={({isActive}) => activeClass(isActive)}>Stacking</NavLink>
                    </li>}
                    <li>
                        <NavLink to={'/info'} className={({isActive}) => activeClass(isActive)}>Info</NavLink>
                    </li>
                </ul>

                <div className="coins">
                    {signer && <Balances balance={formattedBalance} />}
                </div>
            </aside>

            <div className="sub">
                <header className="header">
                    <button onClick={handleClick}>
                        {isAuthLoading ? 'Loading...' : isAuth ? 'Exit' : 'Sign in'}
                    </button>
                </header>

                <main className="main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App