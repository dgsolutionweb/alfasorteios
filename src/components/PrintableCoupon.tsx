import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface PrintableCouponProps {
  code: string;
}

const PrintableCoupon = React.forwardRef<HTMLDivElement, PrintableCouponProps>(({ code }, ref) => {
  return (
    <div ref={ref} style={{ 
      width: '80mm',
      padding: '2mm',
      margin: '0 auto',
      fontFamily: 'monospace',
      fontSize: '10pt',
      backgroundColor: 'white',
      color: 'black',
      boxSizing: 'border-box',
      WebkitPrintColorAdjust: 'exact',
      printColorAdjust: 'exact',
      display: 'block',
      pageBreakInside: 'avoid',
      pageBreakAfter: 'always',
      visibility: 'visible',
      position: 'relative',
      border: 'none',
      outline: 'none',
      textAlign: 'center',
      minHeight: '100%',
      '@media print': {
        display: 'block !important',
        visibility: 'visible !important',
        position: 'static !important',
        width: '80mm !important',
        margin: '0 auto !important',
        padding: '2mm !important'
      }
    } as React.CSSProperties}>
      {/* Cabeçalho */}
      <div style={{ 
        borderBottom: '1px solid black',
        paddingBottom: '2mm',
        marginBottom: '2mm',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'white'
      }}>
        <div style={{ 
          fontSize: '16pt',
          fontWeight: 'bold',
          marginBottom: '1mm',
          display: 'block',
          backgroundColor: 'white'
        }}>ALFA PRIME</div>
        <div style={{ 
          fontSize: '10pt', 
          display: 'block',
          backgroundColor: 'white'
        }}>@alfa.prime_</div>
      </div>

      {/* Código */}
      <div style={{ 
        border: '1px solid black',
        padding: '2mm',
        margin: '2mm 0',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'white'
      }}>
        <div style={{ 
          fontSize: '8pt', 
          marginBottom: '1mm', 
          display: 'block',
          backgroundColor: 'white'
        }}>SEU CÓDIGO</div>
        <div style={{ 
          fontSize: '20pt',
          fontWeight: 'bold',
          letterSpacing: '1mm',
          display: 'block',
          backgroundColor: 'white'
        }}>{code}</div>
      </div>

      {/* QR Code */}
      <div style={{ 
        margin: '2mm 0',
        textAlign: 'center',
        backgroundColor: 'white',
        display: 'block'
      }}>
        <QRCodeSVG 
          value={`https://dgsolutionweb.github.io/alfasorteios/register/${code}`}
          size={100}
          level="M"
          includeMargin={true}
          style={{
            display: 'inline-block',
            backgroundColor: 'white'
          }}
        />
      </div>

      {/* Instruções */}
      <div style={{ 
        margin: '2mm 0',
        padding: '2mm',
        border: '1px solid black',
        fontSize: '8pt',
        display: 'block',
        backgroundColor: 'white',
        textAlign: 'left'
      }}>
        <div style={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          marginBottom: '1mm', 
          display: 'block',
          backgroundColor: 'white'
        }}>
          COMO PARTICIPAR:
        </div>
        <div style={{ marginBottom: '1mm', display: 'block', backgroundColor: 'white' }}>1. Siga @alfa.prime_ no Instagram</div>
        <div style={{ marginBottom: '1mm', display: 'block', backgroundColor: 'white' }}>2. Marque 3 amigos no post do sorteio</div>
        <div style={{ marginBottom: '1mm', display: 'block', backgroundColor: 'white' }}>3. Compartilhe nos stories</div>
        <div style={{ marginBottom: '1mm', display: 'block', backgroundColor: 'white' }}>4. Acesse: dgsolutionweb.github.io/alfasorteios</div>
        <div style={{ display: 'block', backgroundColor: 'white' }}>5. Cadastre-se usando este código</div>
      </div>

      {/* Data */}
      <div style={{ 
        borderTop: '1px solid black',
        marginTop: '2mm',
        paddingTop: '2mm',
        fontSize: '8pt',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'white'
      }}>
        <div style={{ display: 'block', backgroundColor: 'white' }}>Emitido em: {new Date().toLocaleString('pt-BR')}</div>
        <div style={{ display: 'block', backgroundColor: 'white' }}>Sorteio: 01/01/2025</div>
      </div>

      {/* Avisos */}
      <div style={{ 
        marginTop: '2mm',
        fontSize: '8pt',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'white'
      }}>
        <div style={{ fontWeight: 'bold', display: 'block', backgroundColor: 'white' }}>IMPORTANTE:</div>
        <div style={{ display: 'block', backgroundColor: 'white' }}>* Guarde este cupom</div>
        <div style={{ display: 'block', backgroundColor: 'white' }}>* Válido somente com cadastro no site</div>
        <div style={{ display: 'block', backgroundColor: 'white' }}>* Perfil do Instagram deve estar público</div>
      </div>

      {/* Linha de Corte */}
      <div style={{ 
        marginTop: '4mm',
        borderTop: '1px dashed black',
        paddingTop: '1mm',
        fontSize: '8pt',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'white'
      }}>
        ✂️ - - - - - - RECORTE AQUI - - - - - - ✂️
      </div>
    </div>
  );
});

PrintableCoupon.displayName = 'PrintableCoupon';

export default PrintableCoupon; 