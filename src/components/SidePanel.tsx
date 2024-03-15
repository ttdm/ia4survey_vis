import React, { useState, useEffect } from 'react';
import clusterData from "./cluster_summary.json";
import answers from "./answer_subset.json";

interface SidePanelProps {
    selectedBar: number[];
    histogramSize: number;
}

interface ClusterSummary {
    clusterId: number;
    position: string;
    clusterSize: number;
    clusterName: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedBar, histogramSize }) => {
    const [randomContribId, setRandomContrib] = useState<number>(1);
    const handleButtonClick = () => {
        setRandomContrib(Math.floor(Math.random() * 100) + 1);
    };

    const getTitleContent = () => {
        if (selectedBar.length > 0) {
            if (selectedBar[2] === -1) return "";
            const cluster = clusterData[selectedBar[2]];
            return cluster.clusterName;
        } else {
            return '';
        }
    };

    const displayClusterList = () => {
        if (selectedBar.length === 0) return "";
        if (selectedBar[2] === -1) return (
            <ul>
                {clusterData.map(cluster => (
                    <li key={cluster.clusterId}>
                        {cluster.clusterName}
                    </li>
                ))}
            </ul >
        )

        const histoWidth = 22. / histogramSize; // depr, bad constant in multiple files
        const minx = selectedBar[0] - histoWidth / 2;
        const maxx = selectedBar[0] + histoWidth / 2;
        const filteredClusters = clusterData.filter(
            cluster => cluster.position >= minx && cluster.position <= maxx
        );
        const mainCluster = clusterData[selectedBar[2]];
        if (!filteredClusters.includes(mainCluster)) {
            filteredClusters.unshift(mainCluster);
        }
        return (
            <ul>
                {filteredClusters.map(cluster => (
                    <li key={cluster.clusterId}>
                        {cluster.clusterName}
                    </li>
                ))}
            </ul >
        )
    }

    const selectRandomContrib = () => {
        if (selectedBar.length === 0 || selectedBar[2] === -1) {
            const rand = Math.floor(Math.random() * answers.length);
            return answers[rand].text;
        }
        const histoWidth = 22. / histogramSize; // depr, bad constant in multiple files
        const minx = selectedBar[0] - histoWidth / 2;
        const maxx = selectedBar[0] + histoWidth / 2;
        const filteredAnswer = answers.filter(
            answer => answer.X >= minx && answer.X <= maxx
        );
        const rand = Math.floor(Math.random() * filteredAnswer.length);
        return answers[rand].text;
    }

    return (
        <div className="side-panel">
            <h2 className='panel-title'>Dans la sélection</h2>
            <h4>Idée la plus présente :</h4>
            <div className='cluster-title'>
                <h2>{getTitleContent()}</h2>
            </div>
            <h4>Un extrait de réponse au hasard :</h4>
            <div className='random-contrib'>{selectRandomContrib()}</div>
            <button onClick={handleButtonClick}>Une autre!</button>
            <h4>Tous les groupes d'idées de la tranche sélectionnée :</h4>
            <div className='clusterList'>
                {displayClusterList()}
            </div>
        </div>
    );
};

export default SidePanel;