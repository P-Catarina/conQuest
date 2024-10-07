"""empty message

Revision ID: 63e7e763bbb3
Revises: 1335f5a7ba09
Create Date: 2024-10-07 17:01:53.497991

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63e7e763bbb3'
down_revision = '1335f5a7ba09'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('combat_text')
    with op.batch_alter_table('role', schema=None) as batch_op:
        batch_op.alter_column('passive',
               existing_type=sa.NUMERIC(precision=3, scale=1),
               type_=sa.Integer(),
               existing_nullable=False)

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('experience',
               existing_type=sa.NUMERIC(precision=3, scale=1),
               type_=sa.Integer(),
               existing_nullable=False)
        batch_op.alter_column('energy',
               existing_type=sa.NUMERIC(precision=3, scale=1),
               type_=sa.Integer(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('energy',
               existing_type=sa.Integer(),
               type_=sa.NUMERIC(precision=3, scale=1),
               existing_nullable=False)
        batch_op.alter_column('experience',
               existing_type=sa.Integer(),
               type_=sa.NUMERIC(precision=3, scale=1),
               existing_nullable=False)

    with op.batch_alter_table('role', schema=None) as batch_op:
        batch_op.alter_column('passive',
               existing_type=sa.Integer(),
               type_=sa.NUMERIC(precision=3, scale=1),
               existing_nullable=False)

    op.create_table('combat_text',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('text', sa.VARCHAR(length=1000), autoincrement=False, nullable=False),
    sa.Column('creature_or_role_type', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='combat_text_pkey')
    )
    # ### end Alembic commands ###