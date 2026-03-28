graph TD
    subgraph Core_y_Gestion ["Core & Auth"]
        accounts[puntoindigo/accounts]
        id[puntoindigo/id]
        launchpad[puntoindigo/launchpad]
        style accounts fill:#f9f,stroke:#333
        style id fill:#f9f,stroke:#333
    end

    subgraph Productos_Verticales ["Productos & Servicios"]
        remitero[puntoindigo/remitero]
        oliveros[puntoindigo/oliveros]
        recibos[puntoindigo/recibos-gremio]
        postulador[puntoindigo/postulador]
        style remitero fill:#dfd,stroke:#333
    end

    subgraph IA_y_Automatizacion ["AI Stack"]
        ai[puntoindigo/ai]
        orchestrator[puntoindigo/devbot-orchestrator]
        vorum[puntoindigo/vorum]
        vorumwa[puntoindigo/vorum-wa]
        style ai fill:#bbf,stroke:#333
    end

    subgraph Labs_y_Frontend ["Experimental & UI"]
        audio[puntoindigo/v0-audio-generation-interface]
        mvp[puntoindigo/mvp]
        dev[puntoindigo/dev]
    end

    %% Relaciones
    id --> accounts
    accounts --> remitero
    ai --> orchestrator
    orchestrator --> vorum
    vorum --> vorumwa
