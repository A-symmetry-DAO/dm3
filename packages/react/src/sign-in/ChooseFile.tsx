import React, { useContext } from 'react';
import './SignIn.css';
import * as Lib from 'dm3-lib';
import { GlobalContext } from '../GlobalContextProvider';

interface ChooseFileProps {
    storageLocation: Lib.storage.StorageLocation;
    setDataFile: (dataFile: string | undefined) => void;
}

function ChooseFile(props: ChooseFileProps) {
    const { state } = useContext(GlobalContext);
    const upload = (event: any) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    props.setDataFile(e.target?.result as string);
                }
            };
            reader.readAsText(file);
        }
    };

    if (
        !(
            state.uiState.proflieExists &&
            props.storageLocation === Lib.storage.StorageLocation.File
        )
    ) {
        return null;
    }

    return (
        <div className="row row-space">
            <div className="col-md-5">
                <input
                    type="file"
                    className="form-control"
                    onChange={(event) => upload(event)}
                />
            </div>{' '}
            <div className="col-md-7 help-text">Choose dm3 storage file</div>
        </div>
    );
}

export default ChooseFile;
