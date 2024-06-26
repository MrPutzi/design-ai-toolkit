import React, {Component} from 'react';
import SquigglyLines from "./SquigglyLines";
import Dropdown from "./Dropdown";
import stablediffusion from "../pages/stablediffusion";

class NadpisAi extends Component {
    render() {
        return (
            <div className="flex items-center justify-center">
                <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-5xl">
        <span className="relative whitespace-nowrap text-[#3290EE] pb-3">
            <SquigglyLines/>
            <span className="relative leading-none"> Umelá inteligencia </span>
                    <SquigglyLines/>
        </span>
                    na dosah ruky.
                </h1>
            </div>
        );
    }
}

export default NadpisAi;