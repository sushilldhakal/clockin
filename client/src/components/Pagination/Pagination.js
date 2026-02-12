import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

/**
 * pagination: { page, limit, total, totalPages }
 * onPageChange: (page) => {}
 * onLimitChange: (limit) => {} optional
 */
const Pagination = ({ pagination, onPageChange, onLimitChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, limit, total, totalPages } = pagination;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <Row className="align-items-center mt-2 mb-2">
      <Col md={6}>
        <span className="text-muted small">
          Showing {from}-{to} of {total}
        </span>
      </Col>
      <Col md={6} className="d-flex justify-content-end align-items-center gap-2">
        {onLimitChange && (
          <Form.Select
            size="sm"
            style={{ width: "auto" }}
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </Form.Select>
        )}
        <div className="btn-group btn-group-sm">
          <Button
            variant="outline-secondary"
            disabled={page <= 1}
            onClick={() => onPageChange(1)}
          >
            First
          </Button>
          <Button
            variant="outline-secondary"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </Button>
          <span className="px-2 align-self-center small">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline-secondary"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
          <Button
            variant="outline-secondary"
            disabled={page >= totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            Last
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Pagination;
