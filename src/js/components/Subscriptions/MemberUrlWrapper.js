import React, { useContext } from 'react'
import { MainContext } from "../../Context/main-context"
import MemberDetails from './MemberDetails'

export default function MemberUrlWrapper({ match, navIndex, setNavIndex }) {
    var { store } = useContext(MainContext);

    var [state, dispatch] = store;
    var { members } = state;

    var member = members.find(member => member.id == match.params.id)

    return (
        <MemberDetails {...{ member, match, navIndex, setNavIndex }} />
    )
}