import { Button } from '../types/button';
import { PrimaryWallet } from '../buttons/primaryWallet';
import { SelectWallet } from '../buttons/selectWallet';
import { ManageWallet } from '../buttons/manageWallet';
import { ViewTransaction } from '../buttons/viewTransaction';
import { ViewActivity } from '../buttons/viewActivity';
import { BridgeFunds } from '../buttons/bridgeFunds';
import { Farm } from '../buttons/farm';
import { ConfigureAutomation, DisableAutomation, EnableAutomation } from '../buttons/configureAutomation';
import { ConfigureWallet, RenameWallet, ToggleAutomation, ViewPrivateKey } from '../buttons/configureWallet';

export const Buttons: Button[] = [
    PrimaryWallet,
    SelectWallet,
    ManageWallet,
    ViewTransaction,
    ViewActivity,
    BridgeFunds,
    Farm,
    ConfigureAutomation,
    EnableAutomation,
    DisableAutomation,
    ViewPrivateKey,
    ConfigureWallet,
    RenameWallet,
    ToggleAutomation
];
