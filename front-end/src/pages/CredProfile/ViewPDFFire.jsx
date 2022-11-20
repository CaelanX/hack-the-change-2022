import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './ViewPdf.css';

const options = {
	cMapUrl: 'cmaps/',
	cMapPacked: true,
	standardFontDataUrl: 'standard_fonts/',
};

export default function ViewPdfFire({ fileUrl }) {
	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages: nextNumPages }) {
		setNumPages(nextNumPages);
	}

	return (
		<div className="Example">
			<Box className="Example__container">
				{/* <div className="Example__container__load">
					<label htmlFor="file">Load from file:</label>{' '}
					<input onChange={onFileChange} type="file" />
				</div> */}
				<div className="Example__container__document">
					<Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
						{Array.from(new Array(numPages), (el, index) => (
							<Page key={`page_${index + 1}`} pageNumber={index + 1} />
						))}
					</Document>
				</div>
			</Box>
		</div>
	);
}
