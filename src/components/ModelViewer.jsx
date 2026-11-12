import { useEffect, useRef, useState } from 'react'
import '@google/model-viewer'
import './ModelViewer.css'

// Reset loading feedback whenever the source changes.
export default function ModelViewer({ src = '/models/model.glb', alt = 'Interactive 3D kart model' }) {
  return <Viewer key={src} src={src} alt={alt} />
}

function Viewer({ src, alt }) {
  const [status, setStatus] = useState('loading')
  const [isRotating, setIsRotating] = useState(true)
  const viewerRef = useRef(null)

  useEffect(() => {
    viewerRef.current.autoRotate = isRotating
  }, [isRotating])

  useEffect(() => {
    const viewer = viewerRef.current
    const onLoad = () => setStatus('loaded')
    const onError = () => setStatus('error')
    viewer.addEventListener('load', onLoad)
    viewer.addEventListener('error', onError)
    // A cached model may have loaded before the effect attached its listeners.
    if (viewer.loaded) onLoad()
    return () => {
      viewer.removeEventListener('load', onLoad)
      viewer.removeEventListener('error', onError)
    }
  }, [])

  return (
    <div className="model-viewer">
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        camera-controls
        auto-rotate-delay="0"
        rotation-per-second="20deg"
        touch-action="pan-y"
        camera-orbit="35deg 65deg 105%"
        camera-target="auto auto auto"
        field-of-view="30deg"
        shadow-intensity="1"
        shadow-softness="1"
        exposure="1"
        interaction-prompt="auto"
        loading="eager"
      />
      <div className="model-viewer-toolbar">
        <span className="model-viewer-badge">
          <span className="model-viewer-dot" aria-hidden="true" />
          3D KART
        </span>
        <div className="model-viewer-actions">
          <button
            type="button"
            className="model-viewer-toggle"
            onClick={() => setIsRotating((rotating) => !rotating)}
            aria-label={isRotating ? 'Pause automatic rotation' : 'Resume automatic rotation'}
          >
            {isRotating ? 'Pause' : 'Resume'}
          </button>
          <span className="model-viewer-badge model-viewer-hint">
            DRAG 360° <span>INTERACTIVE</span>
          </span>
        </div>
      </div>
      {status !== 'loaded' && (
        <p className="model-viewer-message" role="status">
          {status === 'error'
            ? 'Unable to load the 3D model. Check the model file and reload the page.'
            : 'Loading kart…'}
        </p>
      )}
    </div>
  )
}
